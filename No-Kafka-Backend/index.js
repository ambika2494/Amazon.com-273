

const app=require('./app')

const readRouter=require('./routers/read/read');
const writeRouter=require('./routers/write/write');


//route configurations

app.use('/read',readRouter);
app.use('/write',writeRouter);



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


