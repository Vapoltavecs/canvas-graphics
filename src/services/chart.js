import $api from "../api";


class Chart {
  async getChart() {
    return await $api.get("charts.json");
  }
}


export default new Chart()