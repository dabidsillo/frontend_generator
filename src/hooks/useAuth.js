import AxiosClient from "../config/axios"
export const useAuth = ({middleware, url}) => {
    const register = async(formData, setErrors) => {
        try {
            const { data } = await AxiosClient.post('/auth/register', formData)
            localStorage.setItem('AUTH_TOKEN', data.access_token)
            setErrors([])
        } catch (error) {
            if (error.response && error.response.data.detail) {
                setErrors(Object.fromEntries(error.response.data.detail.map((item) => [item.loc[1], item.msg])))
            }
        }
    }

    const login = async(formData, setErrors) => {
        try {
            const { data } = await AxiosClient.post('/auth/login', formData)
            localStorage.setItem('AUTH_TOKEN', data.access_token)
            setErrors([])
        } catch (error) {
            if (error.response && error.response.data.detail) {
                setErrors(Object.fromEntries(error.response.data.detail.map((item) => [item.loc[1], item.msg])))
            }
        }
    }

    return {
        register,
        login
    }

}