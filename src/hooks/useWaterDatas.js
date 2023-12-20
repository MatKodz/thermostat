import {useState , useEffect} from 'react';

const promiseWrapper = (promise) => {
  let status = "pending";
  let result;

  const s = promise.then(
    (value) => {
      status = "success";
      result = value;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return () => {
    switch (status) {
      case "pending":
        throw s;
      case "success":
        return result;
      case "error":
        throw result;
      default:
        throw new Error("Unknown status");
    }
  };
};

const useWaterDatas = (url) => {

  const [datas,setDatas] = useState(null);

  useEffect(() => {
      const getTemperaturesAPI = async () => {
        const apiResponse = fetch(url).then( res => res.json() ).then( res => res.results);
        setDatas(promiseWrapper(apiResponse))
       }
      getTemperaturesAPI()
    },[url]);

    return datas
}




/*
let datas = [];

 datas = useMemo( async () => {
  const apiResponse = await fetch(url);
  const jsonDatas =  await apiResponse.json()
  // console.log(jsonDatas.results)
  return jsonDatas.results;
}, [])
*/

/*

useEffect(() => {
    const getTemperaturesAPI = async () => {
      const rep = await fetch(url);
      const datasJson = await rep.json()
      // return datasJson
      setTimeout(function() {setDatas(datasJson.results)}, 5000)

     }

    getTemperaturesAPI()
    .catch(console.error)

  },[url]);

  return datas;
  */

export default useWaterDatas;
