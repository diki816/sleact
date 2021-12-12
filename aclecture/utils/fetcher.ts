import axios from "axios";
import { truncate } from "fs";

const fetcher = (url: string) => axios.get(url, {withCredentials: true,}).then((response) => response.data);

export default fetcher;

