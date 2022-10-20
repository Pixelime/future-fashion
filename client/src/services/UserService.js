import api from '../api';

class UserService{
    getAll() {
        return api.get("/users");
    }

    get(id) {
        return api.get(`/users/${id}`);
    }

    create(data) {
        return api.post("/users", data);
    }

    update(id, data) {
        return api.put(`/users/${id}`, data);
    }

    delete(id) {
        return api.delete(`/users/${id}`);
    }
}

export default new UserService();
