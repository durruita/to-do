
function Dog(name, age){
    this.name = name;
    this.age = age;
}

class Cat{
    // auto called when creating objects
    constructor(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;
    }
}

function objects(){

    //object literal
    let d1 = {
        name: "fido",
        age: 3
    };

    let d2 = {
        name: "Lola",
        age: 4
    };
    console.log(d1);
    console.log(d2);

    // object contructure
    let d3 = new Dog("dude", 1);
    let d4 = new Dog("pal", 2);
    console.log(d3,d4);

    //classes
    let c1 = new Cat("Dr. Meowsalot", 3, "white");
    let c2 = new Cat("Catman", 2, "black");
    console.log(c1,c2);
}
function testRequest(){
    $.ajax({
        type: "GET",
        url: "https://restclass.azurewebsites.net/api/test",
        success: function(response){
            console.log("Server says:", response);
        },
        error: function(error){
            console.log("Req failed", error);
        }
    });
}

//exec
objects();

testRequest();