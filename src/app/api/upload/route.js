
export async function POST(req){
    const data = await req.formData(); 
    //console.log(data);
    if(data.get('file')){
        //upload the file
        console.log('we have file',data.get('file'))
    }
    return Response.json(true);
}
