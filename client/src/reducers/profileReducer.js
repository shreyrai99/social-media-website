import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILES,PROFILE_ERROR} from '../actions/types';

const initialState={
    profile:null,
    profiles:null, //array of profiles
    loading: false, //use a spinner till the profile is loading
}

export default function(state=initialState,action){
    switch(action.type){
        case PROFILE_LOADING:
            return{
                ...state,
                loading: true
            }
        case GET_PROFILE:
            return{
                ...state,
                profile: action.payload,
                loading:false
            }
        case CLEAR_CURRENT_PROFILE:
            return{
                ...state,
                profile: null,                
            }
        case GET_PROFILES:
            return{
                ...state,
                profiles:action.payload,
                loading:false
            }
            case PROFILE_ERROR:
                return {
                  ...state,
                  error: action.payload,
                  loading: false,
                  profile: null
                };
        default:
            return state;
    }
}