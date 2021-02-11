import { useHistory } from 'react-router-dom';

export const useAuthCheck = () => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    
    if (!token) {
        history.push('/login');
    }
}

