import axios from "axios";

const url = import.meta.env.VITE_API;

export interface Response{
    status: number;
    data: any,
    isError: boolean
}

export const getTasks = async(): Promise<Response>=>{
    try {
        const response = await axios.get(url);
        return {
            status: response.status,
            data: response.data,
            isError: false
        };
    } catch (error) {
      return {
        status: 404,
        isError: true,
        data: []
      };
    }
}