import { http } from "./config";

export default {
  listAll: () => {
    return http.get("series");
  },

  save: (series) => {
    return http.post("series", series);
  },

  update: (series) => {
    return http.put("series", series);
  },

  delete: (series) => {
    return http.delete("series", { data: series });
  },
};
