const monsterButton = document.getElementById('monsterButton');
monsterButton.addEventListener('click', generateMonster);
const endpoint = "https://www.dnd5eapi.co/api/monsters";

function generateMonster(){
    // document.getElementById('result').innerHTML = "<div id = 'monsterName'></div><div id = 'monsterType'></div><div id = 'AC'></div><div id = 'HP'></div><div id = 'speed'></div><div id = 'stats'></div><div id ='pt2hr></div><div id = 'pt2'><div id = 'savingThrows'></div><div><div id = 'damageVulnerabilities'></div><div id = 'damageResistances'></div><div id = 'damageImmunities'></div><div id = 'conditionImmunities'></div><div id = 'senses'></div><div id = 'languages'></div><div id = 'CR'></div></div></div><div id = 'skills'></div><div id = 'actions'></div><div id = 'LA'></div>";
    console.log("Monster button was clicked");
    let monsterSelected = document.getElementById('creatureName').value;
    monsterSelected = monsterSelected.toLowerCase();
    for(let i = 0; i < monsterSelected.length; i++){
        if (monsterSelected[i] === ' '){
            monsterSelected = monsterSelected.replace(" ", "-");
        }
    }
    console.log(monsterSelected)
    let monsterLink = endpoint + '/'+monsterSelected;
    console.log(monsterLink)
    fetch(monsterLink)
    .then((data) => data.json())
    .then((data) => {
        console.log(data);
        
        document.getElementById("result").classList.add("result")
        document.getElementById("body").classList.add("body")
        
        document.getElementById('monsterName').innerHTML = '<h1>' + data.name + '</h1>';

        document.getElementById('monsterType').innerHTML = '<h3>' + data.size + "  " + data.type + ',  ' + data.alignment + '</h3>' +"<hr color='red'>";

        document.getElementById('AC').innerHTML = '<p><em>Armor Class:</em>  '+data.armor_class+'</p>';

        document.getElementById('HP').innerHTML = '<p><em>Hit Points:</em>  '+data.hit_points + " (" + data.hit_dice + ')</p>'
       
        //speeds
        let movement = '<p><em>Speed</em> ' +data.speed.walk+ ' ';
        if(data.speed.swim){movement += "swim " + data.speed.swim+ " ";} 
        if(data.speed.fly){movement += "fly " + data.speed.fly+ " ";}
        if(data.speed.burrow){movement += "burrow " + data.speed.burrow + " ";}
        document.getElementById('speed').innerHTML = movement+ "</p>" + "<hr color='red'>";
        //Stat block
        let stats ='<p id = "STR"><strong>STR:</strong> ' + data.strength + ' ('+ getBonus(data.strength) +')</p>' + 
        '<p id = "DEX"><strong>DEX:</strong> ' + data.dexterity  + ' ('+ getBonus(data.dexterity) +')</p>' + 
        '<p id = "CON"><strong>CON:</strong> ' + data.constitution  + ' ('+ getBonus(data.constitution) +')</p>' + 
        '<p id = "INT"><strong>INT:</strong> ' + data.intelligence  + ' ('+ getBonus(data.intelligence) +')</p>' +
        '<p id = "WIS"><strong>WIS:</strong> ' + data.wisdom  + ' ('+ getBonus(data.wisdom) +')</p>' + 
        '<p id = "CHA"><strong>CHA:</strong> ' + data.charisma  + ' ('+ getBonus(data.charisma) +')</p>';
        document.getElementById('stats').innerHTML = stats;
        document.getElementById('pt2hr').innerHTML = "<hr color='red'>"
        document.getElementById('pt2').innerHTML = "<div id = 'savingThrows'></div><div><div id = 'damageVulnerabilities'></div><div id = 'damageResistances'></div><div id = 'damageImmunities'></div><div id = 'conditionImmunities'></div><div id = 'senses'></div><div id = 'languages'></div><div id = 'CR'></div></div></div>";
        data.proficiencies.forEach(obj => {
            document.getElementById('savingThrows').innerHTML += '<p>'+ obj.proficiency.name + ' (+' + obj.value + ")";            
        });
        // Damage Vulnerabilties:
        if(data.damage_vulnerabilities.length !==0){
            console.log(data.damage_vulnerabilities.length)
            let vulnerabilties = '<p><strong>Damage Vulnerabilties: </strong>';
            data.damage_vulnerabilities.forEach(obj =>{
                vulnerabilties += obj + ' ';
            });
            document.getElementById('damageVulnerabilities').innerHTML = vulnerabilties + '</p>';
        }
        // Damage Resistences
        if(data.damage_resistances.length !==0){
            // console.log(data.damage_vulnerabilities.length)
            let resistances = '<p><strong>Damage Resistences: </strong>';
            data.damage_resistances.forEach(obj =>{
                resistances += obj+ " ";
            });
            document.getElementById('damageResistances').innerHTML = resistances + '</p>';
        }
        // Damage Immunities
        if(data.damage_immunities.length !==0){
            // console.log(data.damage_vulnerabilities.length)
            let immunities = '<p><strong>Damage Immunities: </strong>';
            data.damage_immunities.forEach(obj =>{
                immunities += obj + " ";
            });
            document.getElementById('damageImmunities').innerHTML = immunities + '</p>';
        }
        // conditionImmunities
        if(data.condition_immunities.length !==0){
            // console.log(data.damage_vulnerabilities.length)
            let conditions= '<p><strong>Damage Immunities: </strong>';
            data.condition_immunities.forEach(obj =>{
                conditions += obj + " ";
            });
            document.getElementById('conditionImmunities').innerHTML = conditions + '</p>';
        }
        //senses
        var senses = '<p><strong>Senses</strong> ';
        if (data.senses.blindsight){
            senses += "Blindsight " + data.senses.blindsight + ', ';
        }
        if (data.senses.darkvision){
            senses += "Darkvision " + data.senses.darkvision + ', ';
        }
        if (data.senses.tremorsense){
            senses += "Tremorsense " + data.senses.tremorsense + ', ';
        }
        senses += 'Passive Perception: ' + data.senses.passive_perception + '</p>';

        document.getElementById('senses').innerHTML = senses;

        document.getElementById('languages').innerHTML = '<p><strong>Languages</strong> ' + data.languages + '</p>';

        document.getElementById('CR').innerHTML = '<p><strong>Challenge Rating</strong> ' + data.challenge_rating + ' ('+data.xp+' XP)'+ '</p>';

        //Skills
        document.getElementById('skills').innerHTML = "<hr color='red'>";
        data.special_abilities.forEach(obj =>{
            let currentSkill = '';
            currentSkill += '<p><strong>' + obj.name;
            if(obj.usage){
                currentSkill += " (" + obj.usage.times + "/"+obj.usage.type+')';
            }
            currentSkill+=".</strong> " + obj.desc + '</p>';
            document.getElementById('skills').innerHTML += currentSkill
        });
        //actions
        document.getElementById('actions').innerHTML = "  <hr color='red'><h2>Actions</h2>";
        data.actions.forEach(obj =>{
            let currentSkill = '';
            currentSkill += '<p><strong>' + obj.name;
            currentSkill+=".</strong> " + obj.desc + '</p>';
            document.getElementById('actions').innerHTML += currentSkill
        });

        //legendary Actions
        document.getElementById('LA').innerHTML = "";
        if (data.legendary_actions){
            document.getElementById('LA').innerHTML = "<hr color='red'><h2>Legendary Actions</h2>";
            data.legendary_actions.forEach(obj =>{
                let currentSkill = '';
                currentSkill += '<p><strong>' + obj.name;
                currentSkill+=".</strong> " + obj.desc + '</p>';
                document.getElementById('LA').innerHTML += currentSkill
            });
        }



    }).catch((error)=>{
        console.log(error);
        document.getElementById('monsterName').innerHTML ='';
        document.getElementById('monsterType').innerHTML = '';
        document.getElementById('AC').innerHTML = '';
        document.getElementById('HP').innerHTML = '';
        console.log('clear speed');
        //speeds
        document.getElementById('speed').innerHTML = '';
        //Stat block
      
        document.getElementById('stats').innerHTML = '';
        document.getElementById('savingThrows').innerHTML = '';

        // Damage Vulnerabilties:
 
        document.getElementById('damageVulnerabilities').innerHTML = '';

        // Damage Resistences

        document.getElementById('damageResistances').innerHTML = '';

        // Damage Immunities

        document.getElementById('damageImmunities').innerHTML = '';
       // conditionImmunities
        document.getElementById('conditionImmunities').innerHTML = '';
        //senses

        document.getElementById('senses').innerHTML = '';

        document.getElementById('languages').innerHTML = '';

        document.getElementById('CR').innerHTML = '';

        //Skills
        document.getElementById('skills').innerHTML = "";
     
        //actions
        document.getElementById('actions').innerHTML = "";
      

        //legendary Actions
        document.getElementById('LA').innerHTML = "";
    });    
}

function getBonus(score){
    let bonus = 0;
    switch (score){
        case 1:
            bonus = '-5';
            break;
        case 2: 
        case 3:
            bonus = '-4';
            break;
        case 4:
        case 5: 
            bonus = '-3';
            break;
        case 6:
        case 7: 
            bonus = '-2'; 
            break;
        case 8:
        case 9: 
            bonus = '-1';
            break;
        case 10:
        case 11:
            bonus = '0';
            break;
        case 12:
        case 13:
            bonus = '+1';
            break;
        case 14:
        case 15:
            bonus = '+2';
            break;
        case 16:
        case 17:
            bonus = '+3';
            break;
        case 18:
        case 19:
            bonus = '+4';
            break;
        case 20:
        case 21:
            bonus = '+5';
            break;
        case 22:
        case 23:
            bonus = '+6';
            break;
        case 24:
        case 25:
            bonus = '+7';
            break;
        case 26:
        case 27:
            bonus = '+8';
            break;
        case 28:
        case 29:
            bonus = '+9';
            break;
        case 30:
            bonus = '+10';
            break;
    }
    // console.log(bonus);
    return bonus;

}