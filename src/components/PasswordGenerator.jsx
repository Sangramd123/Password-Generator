import { useEffect, useState } from "react";

const generatePass = (length, complexity)=>{
    const easyChars = 'abcdefghijklmnopqrstuvwxyz'; 
    const moderateChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    const toughChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';

  let chars;
  switch(complexity){
    case 'Moderate':
     chars = moderateChars;
        break;
    case 'Tough':
        chars = toughChars;
        break;
    default:
        chars = easyChars;
  }

  let password = '';

  for(let i=0; i<length ; i++){
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex]
  }
  return password;
}

export const PasswordGenerator = () =>{
    const [ password, setPassword ] = useState('');
    const [ complexity, setComplexity ] = useState('Tough');
    const [ length, setLength ] = useState('8');
    const [ copied, setCopied ] = useState(false);

    useEffect(()=>{
        const initialPassword = generatePass(length, complexity);
        setPassword(initialPassword);
    },[]);

    const handleGenerate = () => {
        const newPassword = generatePass(length,complexity);
        setPassword(newPassword);
        console.log('Generating password with complexity:', complexity, 'and length:', length);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);

        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return(
    <div className="mt-8 mx-auto bg-white shadow-lg rounded-lg w-2/5 min-h-screen ">
        <h1 className="xl:text-[30px] text-[#1c2f44] md:text-2xl text-xl font-bold text-center mb-4 leading-normal md:leading-[2.5rem] xl:leading-[3rem]"> Password Generator tool </h1>
      <br/>
      <div className="mb-4">
        <label className="block text-left pl-2 text-sm font-semibold text-gray-700 ml-4 mb-1"> Generated Password:</label>
        
        <input className="w-11/12 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" type='text' value={password}  readOnly/>
        <br />

        <label className="block text-left pl-2 mt-5 mb-1 text-sm font-semibold text-gray-700 ml-4"> Complexity:</label>
        
        <select className="w-11/12 p-2 border border-gray-300 rounded-md focus:outline-none" value={complexity} onChange={(e)=>setComplexity(e.target.value) }>
          <option value="Easy"> Easy </option>
          <option value="Moderate"> Moderate </option>
          <option value="Tough"> Tough </option>
        </select>
        <br />

        <label className="block text-left pl-2 mt-5 mb-1 text-sm font-semibold text-gray-700 ml-4"> Password Length </label>
        
        <select className="mb-4 w-11/12 p-2 border border-gray-300 rounded-md focus:outline-none" value={length} onChange={(e)=>{ setLength(e.target.value)} } name="PassLength" >
          
          <option value="8"> 8 </option>
          <option value="9"> 9 </option>
          <option value="10"> 10 </option>
          <option value="11"> 11 </option>
          <option value="12"> 12 </option>
          <option value="13"> 13 </option>
          <option value="14"> 14 </option>
          <option value="15"> 15 </option>
          <option value="16"> 16 </option>
          <option value="17"> 17 </option>
          <option value="18"> 18 </option>
          <option value="19"> 19 </option>
          <option value="20"> 20 </option>
        </select>
      <br />

      </div>
        <button className="inline-flex items-center justify-center rounded font-medium transition-all duration-200 ease-in-out
              border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md hover:scale-105 active:scale-95
              px-4 py-2 text-base
              cursor-pointer" onClick={handleGenerate}> Generate </button>
        <button className="ml-10 px-6 py-2 rounded font-medium bg-green-600 text-white hover:bg-blue-700 hover:shadow-md hover:scale-105 focus:outline-none" onClick={handleCopy}> Copy to Clipboard </button>
 
      {copied && (
          <div className="fixed top-3/4 left-2/4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
            Copied!
          </div>
        )}
    </div>
    );
}