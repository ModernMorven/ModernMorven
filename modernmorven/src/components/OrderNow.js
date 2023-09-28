import React,{useState,useEffect}from 'react';
import '../Filescss/OrderNow.css'
import { useNavigate } from 'react-router-dom';

function OrderNow() {
  const storedUser = JSON.parse(localStorage.getItem('user'))._id;
  const [loader, setloader] = useState('off');
  const [product, setproduct] = useState([]);
  const ItemId= localStorage.getItem('token');
  const storedQuantity=JSON.parse(localStorage.getItem('quanta'));
  const [modalDispaly, setmodalDispaly] = useState("");
  useEffect(() => {
  if(ItemId){
    majorDataCollect();
  }
  
    
  },[ItemId]);

  const majorDataCollect = async() => {
  
     
    
    //localStorage.removeItem('token');
       const response = await fetch("http://127.0.0.1:8000/majorproduct",{
        method:"POST",
        body: JSON.stringify({"mykey":ItemId}),
        headers:{
          "Content-Type":"application/json"
        }
       })
    
      //  const data = await response.json();
        
        if (response){
      const data= await response.json();
      setproduct(data);
     
        }else{
         console.log(response.status);
        }
     
    };
  

const calculateTotalQuantity = () => {
  let total = 0;
  storedQuantity.forEach((section) => {
    if (section.quantity) {
      total += parseInt(section.quantity);
    }
  });
  return total;
};
const totalQuantity = calculateTotalQuantity();
let GrandTOTAl;
product.discountprice!==0?GrandTOTAl= product.discountprice*totalQuantity+product.deliverycharges:GrandTOTAl= product.price*totalQuantity+product.deliverycharges;
  
const [phoneNumber, setPhoneNumber] = useState(null);
const [errorMessage, setErrorMessage] = useState('');

const handleChange = (e) => {
  const inputNumber = e.target.value;

  // Define a regular expression pattern to match the desired format
  const pattern = /^03\d{9}$/;

  if (pattern.test(inputNumber)) {
    setPhoneNumber(inputNumber);
    setErrorMessage('');
  } else {
    setPhoneNumber('');
    setErrorMessage('Invalid phone number. It should start with 03 and have a total length of 11 characters.');
  }
};
const [Rname, setRname] = useState();
const [Raddress, setRaddress] = useState();
const [selectedCity, setSelectedCity] = useState('');
const [message, setmessage] = useState('');
const [colour, setcolour] = useState('');

// setTimeout(() => {
//   setErrorMessage('')
// }, 8000);

function formatDateTime(dateTime) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Asia/Karachi',
  };
  return new Date(dateTime).toLocaleString('en-US', options);
}
const pagechanger = useNavigate();
const navigateToSuccessPage = () => {
    localStorage.removeItem('token')
  localStorage.removeItem('quanta')
  localStorage.removeItem('oorder')
 pagechanger('/');
};
const submithandle=async(e)=>{
  
  e.preventDefault();
  setloader('on')
  const isValid = Raddress !== '' && selectedCity !== '' && Rname !== '' && phoneNumber !== '';

  if (isValid) {
   
    // Code for when the credentials are valid
    try{
      
      const currentDate= new Date();
      const formattedDateTime = formatDateTime(currentDate);
      const response= await fetch("http://backendapi.modernmorven.com/ordermanagement",{
        method:"POST",
        body:JSON.stringify(
        {
          "customerid":storedUser,
          "orderdate": formattedDateTime,
          "productid": ItemId,
          "productname": product.title,
          "productpicture": product.images[0],
          "quantity": storedQuantity,
          "recivername": Rname,
          "recivercontact": phoneNumber,
          "recivercity": selectedCity,
          "address": Raddress,
          "orderstatus": "Processing",
          "paymentmethod": "COD",
          "totalcharges": GrandTOTAl,
        }

        ),
        headers:{'Content-Type':'application/JSON'}
      })

     
if (response.ok) {
  setloader('off')
setmodalDispaly("Congralutions")
setmessage("Your order has been placed successfully. 😍😍");
setcolour("success")
setTimeout(() => {
  navigateToSuccessPage();
}, 4000);

} 
} catch (error) {
  setloader('off')
console.log(`Error: ${error}`);
}
  } else {
    setloader('off');
    setmodalDispaly("OOPS!!");
    setmessage("Invalid credentials");
    setcolour("danger")
  }
              

};


// const datahandler=()=>{

//   pagechanger("/MainArticle")
// }
  return (
    <>
   

    {message&& <div className={`alert alert-${colour}`} role="alert">
    {modalDispaly}
               {message}
</div>}
        
      <div className="order-now-main-container">
        {/* right side container */}

        <form className="OrderNowForm" onSubmit={submithandle}>
              <div className="right-internal-container">
                
                    <div className="address-container">
                            <div className="delivery-address">Delivery Address</div>
                              <textarea id="" className="text-container" placeholder='Enter delivery address' cols="30" rows="5" required onChange={(e)=>{setRaddress(e.target.value)}}> 
                             </textarea>
                          <div className="select-container">
                                 <h4>Select your city</h4>
                                <select   required onChange={(e)=>{setSelectedCity(e.target.value)}}>
                                <option value="">Select City</option>
<option value="Abbottabad">Abbottabad</option>
<option value="Adezai">Adezai</option>
<option value="Ali Bandar">Ali Bandar</option>
<option value="Amir Chah">Amir Chah</option>
<option value="Attock">Attock</option>
<option value="Ayubia">Ayubia</option>
<option value="Bahawalpur">Bahawalpur</option>
<option value="Baden">Baden</option>
<option value="Bagh">Bagh</option>
<option value="Bahawalnagar">Bahawalnagar</option>
<option value="Burewala">Burewala</option>
<option value="Banda Daud Shah">Banda Daud Shah</option>
<option value="Bannu">Bannu</option>
<option value="Batagram">Batagram</option>
<option value="Bazdar">Bazdar</option>
<option value="Bela">Bela</option>
<option value="Bellpat">Bellpat</option>
<option value="Bhag">Bhag</option>
<option value="Bhakkar">Bhakkar</option>
<option value="Bhalwal">Bhalwal</option>
<option value="Bhimber">Bhimber</option>
<option value="Birote">Birote</option>
<option value="Buner">Buner</option>
<option value="Burj">Burj</option>
<option value="Chiniot">Chiniot</option>
<option value="Chachro">Chachro</option>
<option value="Chagai">Chagai</option>
<option value="Chah Sandan">Chah Sandan</option>
<option value="Chailianwala">Chailianwala</option>
<option value="Chakdara">Chakdara</option>
<option value="Chakku">Chakku</option>
<option value="Chakwal">Chakwal</option>
<option value="Chaman">Chaman</option>
<option value="Charsadda">Charsadda</option>
<option value="Chhatr">Chhatr</option>
<option value="Chichawatni">Chichawatni</option>
<option value="Chitral">Chitral</option>
<option value="Dadu">Dadu</option>
<option value="Dera Ghazi Khan">Dera Ghazi Khan</option>
<option value="Dera Ismail Khan">Dera Ismail Khan</option>
<option value="Dalbandin">Dalbandin</option>
<option value="Dargai">Dargai</option>
<option value="Darya Khan">Darya Khan</option>
<option value="Daska">Daska</option>
<option value="Dera Bugti">Dera Bugti</option>
<option value="Dhana Sar">Dhana Sar</option>
<option value="Digri">Digri</option>
<option value="Dina">Dina</option>
<option value="Dinga">Dinga</option>
<option value="Diplo">Diplo</option>
<option value="Diwana">Diwana</option>
<option value="Dokri">Dokri</option>
<option value="Drosh">Drosh</option>
<option value="Duki">Duki</option>
<option value="Dushi">Dushi</option>
<option value="Duzab">Duzab</option>
<option value="Faisalabad">Faisalabad</option>
<option value="Fateh Jang">Fateh Jang</option>
<option value="Ghotki">Ghotki</option>
<option value="Gwadar">Gwadar</option>
<option value="Gujranwala">Gujranwala</option>
<option value="Gujrat">Gujrat</option>
<option value="Gadra">Gadra</option>
<option value="Gajar">Gajar</option>
<option value="Gandava">Gandava</option>
<option value="Garhi Khairo">Garhi Khairo</option>
<option value="Garruck">Garruck</option>
<option value="Ghakhar Mandi">Ghakhar Mandi</option>
<option value="Ghanian">Ghanian</option>
<option value="Ghauspur">Ghauspur</option>
<option value="Ghazluna">Ghazluna</option>
<option value="Girdan">Girdan</option>
<option value="Gulistan">Gulistan</option>
<option value="Gwash">Gwash</option>
<option value="Hyderabad">Hyderabad</option>
<option value="Hala">Hala</option>
<option value="Haripur">Haripur</option>
<option value="Hab Chauki">Hab Chauki</option>
<option value="Hafizabad">Hafizabad</option>
<option value="Hameedabad">Hameedabad</option>
<option value="Hangu">Hangu</option>
<option value="Harnai">Harnai</option>
<option value="Hasilpur">Hasilpur</option>
<option value="Haveli Lakha">Haveli Lakha</option>
<option value="Hinglaj">Hinglaj</option>
<option value="Hoshab">Hoshab</option>
<option value="Islamabad">Islamabad</option>
<option value="Islamkot">Islamkot</option>
<option value="Ispikan">Ispikan</option>
<option value="Jacobabad">Jacobabad</option>
<option value="Jamshoro">Jamshoro</option>
<option value="Jhang">Jhang</option>
<option value="Jhelum">Jhelum</option>
<option value="Jamesabad">Jamesabad</option>
<option value="Jampur">Jampur</option>
<option value="Janghar">Janghar</option>
<option value="Jati(Mughalbhin)">Jati(Mughalbhin)</option>
<option value="Jauharabad">Jauharabad</option>
<option value="Jhal">Jhal</option>
<option value="Jhal Jhao">Jhal Jhao</option>
<option value="Jhatpat">Jhatpat</option>
<option value="Jhudo">Jhudo</option>
<option value="Jiwani">Jiwani</option>
<option value="Jungshahi">Jungshahi</option>
<option value="Karachi">Karachi</option>
<option value="Kotri">Kotri</option>
<option value="Kalam">Kalam</option>
<option value="Kalandi">Kalandi</option>
<option value="Kalat">Kalat</option>
<option value="Kamalia">Kamalia</option>
<option value="Kamararod">Kamararod</option>
<option value="Kamber">Kamber</option>
<option value="Kamokey">Kamokey</option>
<option value="Kanak">Kanak</option>
<option value="Kandi">Kandi</option>
<option value="Kandiaro">Kandiaro</option>
<option value="Kanpur">Kanpur</option>
<option value="Kapip">Kapip</option>
<option value="Kappar">Kappar</option>
<option value="Karak City">Karak City</option>
<option value="Karodi">Karodi</option>
<option value="Kashmore">Kashmore</option>
<option value="Kasur">Kasur</option>
<option value="Katuri">Katuri</option>
<option value="Keti Bandar">Keti Bandar</option>
<option value="Khairpur">Khairpur</option>
<option value="Khanaspur">Khanaspur</option>
<option value="Khanewal">Khanewal</option>
<option value="Kharan">Kharan</option>
<option value="kharian">kharian</option>
<option value="Khokhropur">Khokhropur</option>
<option value="Khora">Khora</option>
<option value="Khushab">Khushab</option>
<option value="Khuzdar">Khuzdar</option>
<option value="Kikki">Kikki</option>
<option value="Klupro">Klupro</option>
<option value="Kohan">Kohan</option>
<option value="Kohat">Kohat</option>
<option value="Kohistan">Kohistan</option>
<option value="Kohlu">Kohlu</option>
<option value="Korak">Korak</option>
<option value="Korangi">Korangi</option>
<option value="Kot Sarae">Kot Sarae</option>
<option value="Kotli">Kotli</option>
<option value="Lahore">Lahore</option>
<option value="Larkana">Larkana</option>
<option value="Lahri">Lahri</option>
<option value="Lakki Marwat">Lakki Marwat</option>
<option value="Lasbela">Lasbela</option>
<option value="Latamber">Latamber</option>
<option value="Layyah">Layyah</option>
<option value="Leiah">Leiah</option>
<option value="Liari">Liari</option>
<option value="Lodhran">Lodhran</option>
<option value="Loralai">Loralai</option>
<option value="Lower Dir">Lower Dir</option>
<option value="Shadan Lund">Shadan Lund</option>
<option value="Multan">Multan</option>
<option value="Mandi Bahauddin">Mandi Bahauddin</option>
<option value="Mansehra">Mansehra</option>
<option value="Mian Chanu">Mian Chanu</option>
<option value="Mirpur">Mirpur</option>
<option value="Moro">Moro</option>
<option value="Mardan">Mardan</option>
<option value="Mach">Mach</option>
<option value="Madyan">Madyan</option>
<option value="Malakand">Malakand</option>
<option value="Mand">Mand</option>
<option value="Manguchar">Manguchar</option>
<option value="Mashki Chah">Mashki Chah</option>
<option value="Maslti">Maslti</option>
<option value="Mastuj">Mastuj</option>
<option value="Mastung">Mastung</option>
<option value="Mathi">Mathi</option>
<option value="Matiari">Matiari</option>
<option value="Mehar">Mehar</option>
<option value="Mekhtar">Mekhtar</option>
<option value="Merui">Merui</option>
<option value="Mianwali">Mianwali</option>
<option value="Mianez">Mianez</option>
<option value="Mirpur Batoro">Mirpur Batoro</option>
<option value="Mirpur Khas">Mirpur Khas</option>
<option value="Mirpur Sakro">Mirpur Sakro</option>
<option value="Mithi">Mithi</option>
<option value="Mongora">Mongora</option>
<option value="Murgha Kibzai">Murgha Kibzai</option>
<option value="Muridke">Muridke</option>
<option value="Musa Khel Bazar">Musa Khel Bazar</option>
<option value="Muzaffar Garh">Muzaffar Garh</option>
<option value="Muzaffarabad">Muzaffarabad</option>
<option value="Nawabshah">Nawabshah</option>
<option value="Nazimabad">Nazimabad</option>
<option value="Nowshera">Nowshera</option>
<option value="Nagar Parkar">Nagar Parkar</option>
<option value="Nagha Kalat">Nagha Kalat</option>
<option value="Nal">Nal</option>
<option value="Naokot">Naokot</option>
<option value="Nasirabad">Nasirabad</option>
<option value="Nauroz Kalat">Nauroz Kalat</option>
<option value="Naushara">Naushara</option>
<option value="Nur Gamma">Nur Gamma</option>
<option value="Nushki">Nushki</option>
<option value="Nuttal">Nuttal</option>
<option value="Okara">Okara</option>
<option value="Ormara">Ormara</option>
<option value="Peshawar">Peshawar</option>
<option value="Panjgur">Panjgur</option>
<option value="Pasni City">Pasni City</option>
<option value="Paharpur">Paharpur</option>
<option value="Palantuk">Palantuk</option>
<option value="Pendoo">Pendoo</option>
<option value="Piharak">Piharak</option>
<option value="Pirmahal">Pirmahal</option>
<option value="Pishin">Pishin</option>
<option value="Plandri">Plandri</option>
<option value="Pokran">Pokran</option>
<option value="Pounch">Pounch</option>
<option value="Quetta">Quetta</option>
<option value="Qambar">Qambar</option>
<option value="Qamruddin Karez">Qamruddin Karez</option>
<option value="Qazi Ahmad">Qazi Ahmad</option>
<option value="Qila Abdullah">Qila Abdullah</option>
<option value="Qila Ladgasht">Qila Ladgasht</option>
<option value="Qila Safed">Qila Safed</option>
<option value="Qila Saifullah">Qila Saifullah</option>
<option value="Rawalpindi">Rawalpindi</option>
<option value="Rabwah">Rabwah</option>
<option value="Rahim Yar Khan">Rahim Yar Khan</option>
<option value="Rajan Pur">Rajan Pur</option>
<option value="Rakhni">Rakhni</option>
<option value="Ranipur">Ranipur</option>
<option value="Ratodero">Ratodero</option>
<option value="Rawalakot">Rawalakot</option>
<option value="Renala Khurd">Renala Khurd</option>
<option value="Robat Thana">Robat Thana</option>
<option value="Rodkhan">Rodkhan</option>
<option value="Rohri">Rohri</option>
<option value="Sialkot">Sialkot</option>
<option value="Sadiqabad">Sadiqabad</option>
<option value="Safdar Abad- (Dhaban Singh)">Safdar Abad- (Dhaban Singh)</option>
<option value="Sahiwal">Sahiwal</option>
<option value="Saidu Sharif">Saidu Sharif</option>
<option value="Saindak">Saindak</option>
<option value="Sakrand">Sakrand</option>
<option value="Sanjawi">Sanjawi</option>
<option value="Sargodha">Sargodha</option>
<option value="Saruna">Saruna</option>
<option value="Shabaz Kalat">Shabaz Kalat</option>
<option value="Shadadkhot">Shadadkhot</option>
<option value="Shahbandar">Shahbandar</option>
<option value="Shahpur">Shahpur</option>
<option value="Shahpur Chakar">Shahpur Chakar</option>
<option value="Shakargarh">Shakargarh</option>
<option value="Shangla">Shangla</option>
<option value="Sharam Jogizai">Sharam Jogizai</option>
<option value="Sheikhupura">Sheikhupura</option>
<option value="Shikarpur">Shikarpur</option>
<option value="Shingar">Shingar</option>
<option value="Shorap">Shorap</option>
<option value="Sibi">Sibi</option>
<option value="Sohawa">Sohawa</option>
<option value="Sonmiani">Sonmiani</option>
<option value="Sooianwala">Sooianwala</option>
<option value="Spezand">Spezand</option>
<option value="Spintangi">Spintangi</option>
<option value="Sui">Sui</option>
<option value="Sujawal">Sujawal</option>
<option value="Sukkur">Sukkur</option>
<option value="Suntsar">Suntsar</option>
<option value="Surab">Surab</option>
<option value="Swabi">Swabi</option>
<option value="Swat">Swat</option>
<option value="Tando Adam">Tando Adam</option>
<option value="Tando Bago">Tando Bago</option>
<option value="Tangi">Tangi</option>
<option value="Tank City">Tank City</option>
<option value="Tar Ahamd Rind">Tar Ahamd Rind</option>
<option value="Thalo">Thalo</option>
<option value="Thatta">Thatta</option>
<option value="Toba Tek Singh">Toba Tek Singh</option>
<option value="Tordher">Tordher</option>
<option value="Tujal">Tujal</option>
<option value="Tump">Tump</option>
<option value="Turbat">Turbat</option>
<option value="Umarao">Umarao</option>
<option value="Umarkot">Umarkot</option>
<option value="Upper Dir">Upper Dir</option>
<option value="Uthal">Uthal</option>
<option value="Vehari">Vehari</option>
<option value="Veirwaro">Veirwaro</option>
<option value="Vitakri">Vitakri</option>
<option value="Wadh">Wadh</option>
<option value="Wah Cantt">Wah Cantt</option>
<option value="Warah">Warah</option>
<option value="Washap">Washap</option>
<option value="Wasjuk">Wasjuk</option>
<option value="Wazirabad">Wazirabad</option>
<option value="Yakmach">Yakmach</option>
<option value="Zhob">Zhob</option>
<option value="Kot Addu">Kot Addu</option>
<option value="Narowal">Narowal</option>
<option value="Tandoalayar">Tandoalayar</option>
<option value="Pak patan">Pak patan</option>
<option value="Nankana sahib">Nankana sahib</option>
<option value="Mirpur mathelo">Mirpur mathelo</option>
<option value="Gujar khan">Gujar khan</option>
<option value="Gojra">Gojra</option>
<option value="Khand khot">Khand khot</option>
<option value="Topi">Topi</option>
<option value="Mirpir azad kashmir">Mirpir azad kashmir</option>
<option value="Joharabad">Joharabad</option>
<option value="Samundari">Samundari</option>
<option value="Kashmore">Kashmore</option>
<option value="Muzaffarabad">Muzaffarabad</option>
<option value="Toba Tek Singh">Toba Tek Singh</option>
<option value="Shujaabad">Shujaabad</option>
<option value="Mehmood kot">Mehmood kot</option>
<option value="Jaranwala">Jaranwala</option>
<option value="Naushahro Feroze">Naushahro Feroze</option>
<option value="Nawabshah">Nawabshah</option>
<option value="Kot Radha Kishan">Kot Radha Kishan</option>
<option value="Khanpur">Khanpur</option>
<option value="Lalamusa">Lalamusa</option>
<option value="Mailsi">Mailsi</option>
<option value="Ubauro">Ubauro</option>
<option value="Mingora Swat">Mingora Swat</option>
<option value="Jauharabad">Jauharabad</option>
<option value="Chishtian">Chishtian</option>
<option value="Ahmedpur East">Ahmedpur East</option>
<option value="Jalalpur Jattan">Jalalpur Jattan</option>
<option value="Sangla Hill">Sangla Hill</option>
<option value="Mirpur Azad Kashmir">Mirpur Azad Kashmir</option>
<option value="Batkhela">Batkhela</option>
<option value="Kotla Arab Ali Khan">Kotla Arab Ali Khan</option>
<option value="Talagang">Talagang</option>
<option value="Ranipur">Ranipur</option>
<option value="Balakot">Balakot</option>
<option value="Chelhar">Chelhar</option>
<option value="Bannu">Bannu</option>
<option value="Shahdadkot">Shahdadkot</option>
<option value="Pattoki">Pattoki</option>
<option value="Matli">Matli</option>
<option value="Kassowal">Kassowal</option>
<option value="Allahabad">Allahabad</option>
<option value="Mianchannu">Mianchannu</option>
<option value="Pakpattan">Pakpattan</option>
<option value="Barnala Azad kashmir">Barnala Azad kashmir</option>
<option value="Tandlianwala">Tandlianwala</option>
<option value="Hawali lakha">Hawali lakha</option>
<option value="TandoAllahyar">TandoAllahyar</option>
<option value="Topi">Topi</option>
<option value="Hazro">Hazro</option>
<option value="Pir Jo Goth">Pir Jo Goth</option>
<option value="Pasrur">Pasrur</option>
<option value="Choa Saidan Shah">Choa Saidan Shah</option>
<option value="Bewal">Bewal</option>
<option value="Sarai Alamgir">Sarai Alamgir</option>
<option value="Ali pur chattha">Ali pur chattha</option>
<option value="Alipur">Alipur</option>
<option value="Karor Lal Eason">Karor Lal Eason</option>
<option value="Chichawatni">Chichawatni</option>
<option value="Matiari">Matiari</option>
<option value="Farooqabad">Farooqabad</option>
<option value="Awansharif">Awansharif</option>
<option value="Haroonabad">Haroonabad</option>
<option value="Kallar Kahar">Kallar Kahar</option>
<option value="Daharki">Daharki</option>
<option value="Bhimbar Azad Kashmir">Bhimbar Azad Kashmir</option>
<option value="Rawala Kot AJK">Rawala Kot AJK</option>
<option value="Kunri">Kunri</option>
<option value="Umerkot">Umerkot</option>
<option value="Shahdadkot">Shahdadkot</option>
<option value="Tando Muhammad Khan">Tando Muhammad Khan</option>
<option value="Gilgit">Gilgit</option>

                                </select>
                             
                          </div>
                                    <div className="ReciverName"><h4>Enter Reciver Full Name </h4>
                                 <input type="text" max={35} required onChange={(e)=>{setRname(e.target.value)}}/>
                                 
                                    </div>

                                        <div className="Reciver-contact-number" ><h4>Enter Reciver Contact Number</h4>
                                        <input type="text"  onChange={handleChange}required/>
                                        {errorMessage&&(<><p className="error-message text-danger mx-3 "> {errorMessage}</p></>)}
                                        {/* {message&&(<>
                                         <p className='errormessage text-danger '>{message}</p></>)}  */}
                                        </div>
                    </div>
                    <strong className='mx-3 ' style={{marginTop:"5%"}}>Note : <span className='text-secondary'> We're currently focused on <span className='text-success'>COD</span>, but stay tuned for future online payment options!</span></strong>
              </div>



                {/* right side container */}
              <div className="left-internal-container">
                 <div className="product-price">
                   <h5>Product Price</h5> 
                   {product.discountprice!==0?(<>
                    <h6> Rs {product.discountprice}</h6>
                   </>):(<>
                    <h6> Rs {product.price}</h6>
                   </>)}
                  

                 </div>
                   
                   <div className="delivery-charges">
                   <h5>Delivery charges </h5>
                   <h6>{product.deliverycharges}</h6>
                  

                   </div>
                   <div className="select-quantity">
                   <span>Quantity</span>
                   <h6>{totalQuantity}</h6>
                    
                   </div>
                   <div className="grand-total">
                   <h5>Grand Total </h5>
                   <h6>Rs {GrandTOTAl}</h6>
                   </div>
                   <div className="continue-button">
                    <button type="submit" >{loader==='off'?(<>Continue</>):(<>
                      <span className="spinner-border spinner-border-sm text-light" aria-hidden="true"></span>
                       <span role="status" className='text-light'>Processing...</span></>)}</button>
                   </div>
              </div>



              </form>
      </div>



    
{/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}



    
    </>
  );
}

export default OrderNow;







