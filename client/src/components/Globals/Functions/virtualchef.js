import axios from "axios";
let validation = require("./validation");

const generateKey = {
  genkey: function (id) {
    if (!validation.isEmpty(id)) {
      axios.post(`/api/virtualchef/createkey/${id}`);
    } else {
      alert("something went wrong");
    }
  },
};

export default generateKey;
