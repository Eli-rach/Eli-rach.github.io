const employees = [
{
    name: "Sam",
    department: 'Tech',
    designation: "Manager",
    salary: 40000,
    raiseEligable: true
},
{
    name: "Mary",
    department: 'Finance',
    designation: "Trainee",
    salary: 18500,
    raiseEligable: true
},
{
    name: "Bill",
    department: 'HR',
    designation: "Executive",
    salary: 21200,
    raiseEligable: false,
},
];

console.log("Problem 1: ", employees);

const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees:employees
};

console.log("Problem 2: ", company);

function addEmployee(name,department,designation,sal,raiseEligable){
    const newEmp ={
        name: name,
        department: department,
        designation: designation,
        salary: sal,
        raiseEligable: raiseEligable
    }

    employees.push(newEmp);
}

addEmployee("Anna", "Tech", "Executive", 25600, false);

console.log(employees[3]);

var totalSal = 0
employees.forEach(obj=>{
    totalSal += obj.salary;
});

console.log("problem 4:", totalSal)
console.log("Prolem 5:")

employees.forEach(obj=>{
    console.log("PreRaise: ", obj.salary);
    if (obj.raiseEligable){
        obj.salary *= 1.1;
    }
    console.log("PostRaise: ",obj.salary);
});



var wfh = ['Anna', 'Sam'];

employees.forEach(obj=>{

    obj.wfh = wfh.includes(obj.name);
    console.log(obj.name + ":" +obj.wfh);
});

console.log(employees)