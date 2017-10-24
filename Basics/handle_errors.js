function uhoh() {
    throw new Error("Badd!!!"); 
}


try{
    uhoh();
}catch(e){
    console.log("i got an error: " + e.message); 
}

// Sort of incompatible with asynchronous programming. we'll need some new strategies. 

