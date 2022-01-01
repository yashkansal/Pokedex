const express=require('express');
const app=express();
const ejs=require('ejs');
const fetch= require('node-fetch');
const { response } = require('express');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');



app.post('/',function(req,res)
{
var pokemon=req.body.name;


fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    
    .then(function(data){
    let abilities = [];
    let types= [];
    
    
    data.abilities.map((item)=>{
        abilities.push(item.ability.name);
    });

    data.types.map((item)=>
    {
    types.push(item.type.name);
    });

     let weight=data.weight;
     let height=data.height;
     let baseExperience=data.base_experience;
     let img=data.sprites.other['official-artwork'].front_default;
     console.log(img);
     console.log(baseExperience);
     res.render("index", {img:img, name:(pokemon.charAt(0).toUpperCase() + pokemon.slice(1)),types:types,baseExp:baseExperience,height:height,weight:weight,abilities:abilities, flag: true});

    });



});

app.get('/',function(req,res)
{
res.render('index.ejs',{img:"",name:"",types:[],baseExp:"",height:"",weight:"",abilities:[], flag:false});

});


app.listen(3000, function () {
    console.log("Server is working");
});