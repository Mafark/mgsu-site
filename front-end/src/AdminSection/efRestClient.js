import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';
import {resolveApi} from "../common/helpers";
import fetch from 'isomorphic-fetch';
import {contentsCategories} from './resources/contents';
import {peopleTeams} from './resources/team';
import {credOptions} from "../common/helpers" 


const createRequest = (type, resource, params) => {

    try {

        let apiQuery = {
            url: '',
            options: {}
        };

    if(peopleTeams[resource]) {
        params.query = {
            team: peopleTeams[resource].team
        },
        resource = 'contacts';
    }

    if(contentsCategories[resource]) {
        params.query = {
            category: contentsCategories[resource].category
        },
        resource = 'posts';
    }

    if(resource == 'donation' && type == CREATE) {
        resource = '/donation/registration'
    }

        const _typesHandlers = {
            GET_LIST: () => {
                apiQuery.url = resolveApi(
                    {
                        path: [resource],
                        query: params.query
                    })

            },
            GET_ONE: () => {
                apiQuery.url = resolveApi(
                    {
                        path: [resource, params.id],
                        query: params.query
                    })
            },
            GET_MANY: () => {
                apiQuery.url = resolveApi(
                    {
                        path: [resource],
                        query: params.query
                    })
            },
            GET_MANY_REFERENCE: () => {
                apiQuery.url = resolveApi(
                    {
                        path: [resource],
                        //query: params.query
                    })
            },
            CREATE: () => {
                apiQuery.url = resolveApi(
                    {
                        path: [resource, params.id],
                        query: params.query
                    })
                apiQuery.options.method = 'POST';
                apiQuery.options.body = params.data;
                console.log(params.data);
            },
            UPDATE: () => {
                apiQuery.url = resolveApi(
                    {
                        path: [resource, params.id],
                    })
                apiQuery.options.method = 'PUT'
                apiQuery.options.body = params.data;
            },
            DELETE: () => {
                apiQuery.url = resolveApi(
                    {
                        path: [resource, params.id, 'remove'],
                    })
                apiQuery.options.method = 'POST'
            }
        };

        if (_typesHandlers[type]) {

            _typesHandlers[type]();
            return apiQuery;

        } else {

            throw new Error(`Unsupported fetch action type ${type}`);

        }

    } catch (e) {
        console.log(e);
    }
};

const formatResponse = (response, type, resource, params) => {
    if(response.status == 200 || response.status ==304 ) {
        console.log(response);

        const mapId = (x) => {x.id = x._id; return x};
        
        const {json} = response;
        switch (type) {
            case CREATE:
                return {data: {...params.data, id: json}}
            case GET_LIST:
            const data = { 
                    data:  (json.docs ? json.docs.map(mapId) : json.map(mapId)),
                    total: json.total || 1000
                    };
            return data;
            break;
            case GET_ONE:
                return {data: mapId(json)}
            default:
                return {data: mapId(json)}
        }

    } else {
      
    }
    
};

const uploadFile = (file) => {

        const url = resolveApi({path: ['files', 'img']});
        const formdata = new FormData();
        formdata.append('file', file);
        const options = {
            method: 'POST',
            body: formdata,
            credentials: 'include'
        }
        return fetchUtils.fetchJson(url, options).then((response) => {
            return Promise.resolve(response.json);
        })
}

export default (type, resource, params) => {
    
    const {url, options} = createRequest(type, resource, params)

    options.headers = new Headers({'Content-Type': 'application/json'});

    options.credentials = 'include';

    if(options.body && options.body.picture) {
      return uploadFile(options.body.picture[0]).then((response) => {
            const {fetchJson} = fetchUtils;
            options.body.img = response;
            options.body = JSON.stringify(options.body);
            return fetchJson(url, options)
                .then(response => (formatResponse(response, type, resource, params)));
        })

    } else {

          if(options.body) {
                options.body = JSON.stringify(options.body);
            }
          const {fetchJson} = fetchUtils;
            return fetchJson(url, options)
                .then(response =>  {return formatResponse(response, type, resource, params)})
                // .catch((reject) => Promise.reject(reject))
    }
  
}

