import toPdf from 'zapoj-office-to-pdf';

export default (req, res) => {
    if(req.query){
        console.log(typeof req.query)
    }
    res.json({msg: "hello"})
    // var pdfBuffer = await toPdf(req.params.)
  }
  2