const nodemailer = require("nodemailer");


exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
    res.status(200).render('index', {
        page_name: "index"
    });
  }


exports.getHakkindaPage = (req, res) => {
    res.status(200).render('hakkinda', {
        page_name: "hakkinda"
    });
  }
  
exports.getRandevuPage = (req, res) => {
    res.status(200).render('randevu', {
        page_name: "randevu"
    });
  }
  
exports.getİletisimPage = (req, res) => {
    res.status(200).render('iletisim', {
        page_name: "iletisim"
    });
  }  

  exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
      page_name: 'login',
    });
  };

  exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
      page_name: 'register',
    });
  };




  exports.sendEmail = async (req, res) => {

    try{
  
    const outputMessage = `
    
    <h1>Mail ramazanaslan.av.tr Sitenizden </h1>
    <ul>
      <li>Ad: ${req.body.ad}</li>
      <li>Soyad: ${req.body.soyad}</li>
      <li>Telefon Numarası: ${req.body.telefon}</li>
      <li>Email: ${req.body.email}</li>
      <li>KONU: ${req.body.konu}</li>
    </ul>
    <h1>Ziyaretçinin Mesajı</h1>
    <p>${req.body.mesaj}</p>

    `
  
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "mdbtiyatroclub@gmail.com", // gmail account
        pass: "121212deniz", // gmail password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"ramazanaslan.av.tr web sitesinden" <mdbtiyatroclub@gmail.com>', // sender address
      to: "denizkarakas@yaani.com", // list of receivers
      subject: "ramazanaslan.av.tr web sitesinden biri iletişim formu doldurdu ✔", // Subject line
      html: outputMessage, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  
    req.flash("success", "Mesajınız başarıyla iletildi!");
  
    res.status(200).send('Mesajınız iletildi!');
  
  } catch (err) {
    //req.flash("error", `Something happened! ${err}`);
    req.flash("error", `Something happened!`);
    res.status(200).send('Mesajınız iletilmedi!');
  }
  
  }; 