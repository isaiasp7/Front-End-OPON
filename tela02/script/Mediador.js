import { Profissional } from "./Profissional"
import { ApiService } from "./script/ConexaoBanco.js";
class Mediador {
    constructor(option) {

        }
        //Setters
    filterEspecializacao(option) {
        const api = ApiService.getInstancia();
        return api.get(
            `http://localhost:8080/profissional/${option}` // Substitua pelo URL real da API
        );

    }
  
}