import {useState} from 'react'
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement,Tooltip, Legend} from 'chart.js'
Chart.register(ArcElement,Tooltip, Legend);

export default function DoughnutChart(props) {

    var [data,setData] = useState({labels:['Red','Green','Custom'],datasets:[{data:[5,4,3],backgroundColor:['#7944d0','green','gray']}]})

  return (
    <div className='text-center m-1' style={{alignItems:'center',justifyContent:'center', height:'350px',background:'white',boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important',borderRadius:'8px'}}>
        <h1 className='p-0 m-0'>DoughnutChart</h1>
        <div className='p-0 m-0' style={{width:'100%',height:'280px',margin:'0 auto'}}>
        <Doughnut style={{width:'280px',height:'280px',margin:'0 auto'}} data={data}/>
        </div>
    </div>
  )
}
