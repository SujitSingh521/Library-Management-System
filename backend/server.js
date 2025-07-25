const express =require ('express');
const app =express();

app.get("/",(req,res)=>{
res.status(200).send('<h1>Welcome to the Backend Server</h1>');
})

const PORT =5000;


app.listen(PORT,()=>{
    console.log(`server is running on Port ${PORT}`);
})