import {useState,useEffect} from 'react'
import categories from '../../public/icons/categories/categoriesList.json'
import icons from '../../public/icons/categories/iconsList.json'
import CategoryCard from './components/CategoryCard'
import ColorSelector from './components/ColorSelector'
import { FloatingLabel,Form } from 'react-bootstrap'
export default function AllCategories() {
  var [selectedIcon,selectIcon] = useState({icon:icons.at(2).icon})
  var [userData,setUserData] = useState({email:'',firstName:'',secondName:'',image:'',gender:'',age:0})
   

  return (
    <div className='p-2 px-3'style={{width:'100%'}}>
        {userData.email.length > 0 && <h1>{userData.email}</h1>}
      <h2 className='my-4'>All categories</h2>
     <fieldset className='p-2 my-3' style={{boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important',borderRadius:'5px'}}>
       <legend>Add new category</legend>
       <div className='row align-items-center justify-content-center'>
       <div className='col-lg-2 col-md-3 col-sm-6 col-xs-12 text-start mb-2'>
       <span style={{color:'darkgray'}} className='me-3'>Icon:</span>
         <ColorSelector icon={selectedIcon} selectIcon={selectIcon} className='me-2'/>
       </div>
       <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-2'>
       <FloatingLabel
            controlId="floatingInput"
            label="Category title"
            className="mb-1" >
             <Form.Control type="text"/>
       </FloatingLabel>
       </div>
       <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-2'>
       <FloatingLabel
            controlId="floatingInput"
            label="Category title"
            className="mb-1" >
       <select className='form-control'  >
         <option>Income</option>
         <option>Expense</option>
       </select>
       </FloatingLabel>
       </div>
       <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 mb-2'>
         <button className='btn btn-primary' style={{width:'100%',height:'58px'}}>save</button>
       </div>
     </div>
     </fieldset>
      <div>Income categories</div>
      <div>
        {categories.filter((item)=>item.type=='income').map((item,index)=><CategoryCard key={index} {...item}/>)}
      </div>
      <div>Expense categories</div>
      <div>
        {categories.filter((item)=>item.type=='expense').map((item,index)=><CategoryCard key={index} {...item}/>)}
      </div>
    </div>

)
}
