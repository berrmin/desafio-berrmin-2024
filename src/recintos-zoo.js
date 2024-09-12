    class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        //Inicializando um vetor com os recintos existentes. Recintos contendo mais de um habitat terá uma array com os habitats.
        let recintos = [
            [1, ["savana"], 10, 3, "MACACO", "onívoro"],
            [2, ["floresta"], 5],
            [3, ["savana", "rio"], 7, 2, "GAZELA", "herbívoro"],
            [4, ["rio"], 8],
            [5, ["savana"], 9, 3, "LEAO", "carnívoro"]
        ];
        //O indice (index) 3 conterá o Nível Trófico do animal (Se é carnívoro ou não)
        let animais = [
            ["LEAO", 3, ["savana"], "carnívoro"], 
            ["LEOPARDO", 2, ["savana"], "carnívoro"], 
            ["CROCODILO", 3, ["rio"], "carnívoro"], 
            ["MACACO", 1, ["savana", "floresta"], "onívoro"], 
            ["GAZELA", 2, ["savana"], "herbívoro"], 
            ["HIPOPOTAMO", 4, ["savana", "rio"], "herbívoro"]
        ];

        let resultado = [];
        let indice_animal = "#";
        

        //Se a quantidade for inválida, retornará o devido erro.
        if(quantidade > 10 || quantidade < 1){
            return {
                erro: "Quantidade inválida"
            };
        }

        //forEach vai procurar se este animal é válido ou não (E pegará o indice do animal)
        animais.forEach((e, i) => {
                if(e.includes(animal)){
                    indice_animal = i;
                }
            });

        if(indice_animal == "#"){
            return {
                erro: "Animal inválido"
            };
        }

        const animal_atual = animais[indice_animal];
        recintos.forEach((e) => {
                let ocupacao = 0;
                let valido = false;
                //Verificar se o animal é compatível com o bioma disponível neste recinto.
                if(e[1].includes(animal_atual[2][0]) || e[1].includes(animal_atual[2][1])){
                valido = true;
            } else valido = false;
            
            //Calcular ocupação do recinto.
            console.log(valido);
            if(valido && e[3] != undefined){
                if(e[4] != animal) ocupacao += e[3] + 1;
                else ocupacao += e[3];
            }
            ocupacao += quantidade * animal_atual[1];

            //Validar se tem espaço disponível.
            if(valido && (ocupacao + quantidade * animal_atual[1]) <= 10){} else valido = false;

            //Verificar se existem espécies neste recinto.
            if(valido && e[3] != undefined){
                //Caso o animal no recinto seja carnívoro.
                if(e[5] == "carnívoro" || animal_atual[3] == "carnívoro"){
                    //Verificar se os animais são compatíveis.
                    if(animal_atual[0] != e[0]){
                        valido = false;
                    }
                }
            };
            //Regra específica: Hipopótamo não tolera outras espécies caso n seja savana e rio.
            if(animal_atual[0] == "HIPOPOTAMO" && e[3] != undefined){
                if(e[1].includes("rio") && e[1].includes("savana")){
                } else valido = false;
            }

            if(animal_atual[0] == "MACACO" && ocupacao == 1) valido = false;

            if(valido){
                resultado.push(`Recinto ${e[0]} (espaço livre: ${e[2] - ocupacao} total: ${e[2]})`);
            }
            
        });

        if(resultado.length == 0){
            return {
                erro: "Não há recinto viável"
            }
        }

        return {
            recintosViaveis: resultado
        };
    }
    
}

export { RecintosZoo as RecintosZoo };
