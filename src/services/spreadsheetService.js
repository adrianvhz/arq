import axios from "axios";

export const getData = (file, data) => {
	let form = new FormData();
	form.append("file", file);
	form.append("data", data);

	return axios.post("http://arq.com/admin/read", form, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	})
}
