import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import "bootstrap/dist/css/bootstrap.css";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setTransaction } from "../../store/slices/transactionSlice";
import axios from "axios";
export default function myDateRangePicker({updateNewData}) {
  const userId = useSelector((state)=>state.user.id)
  let [fromDate, setFromDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  let [toDate, setToDate] = useState(new Date());
  const dispatch = useDispatch()

  const range = {
    Today: [moment(), moment()],
    Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(29, "days"), moment()],
    "This Month": [moment().startOf("month"), moment().endOf("month")],
    "Last Month": [
      moment()
        .subtract(1, "month")
        .startOf("month"),
      moment()
        .subtract(1, "month")
        .endOf("month")
    ],
    "Last Year": [
      moment()
        .subtract(1, "year")
        .startOf("year"),
      moment()
        .subtract(1, "year")
        .endOf("year")
    ]
  };

  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const dateDiffInDays = (a, b) => {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  var diffDatys = dateDiffInDays(new Date(fromDate), new Date(toDate));


  const handleEvent = (event, picker) => {
    setFromDate(picker.startDate._d.toISOString());
    setToDate(picker.endDate._d.toISOString());
    diffDatys = dateDiffInDays(new Date(fromDate), new Date(toDate));
    updateData()
  };


  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const subtractDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }


  const next = () => {
    let tempFromDate = new Date(fromDate)
    let tempToDate = new Date(toDate)
    tempFromDate = addDays(tempFromDate, diffDatys)
    tempToDate = addDays(tempToDate, diffDatys)
    setFromDate(tempFromDate)
    setToDate(tempToDate)
    updateData()
  }

  const previous = () => {
    let tempFromDate = new Date(fromDate)
    let tempToDate = new Date(toDate)
    tempFromDate = subtractDays(tempFromDate, diffDatys)
    tempToDate = subtractDays(tempToDate, diffDatys)
    setFromDate(tempFromDate)
    setToDate(tempToDate)
    updateData()
  }


  const updateData = async()=>{

    const data = await axios.get(`${process.env.API_URL}/transaction/betweenDates/${fromDate}/${toDate}`, {
      headers: {
        token: userId
      }
    })

    if (data.data.state) {
      updateNewData(data.data.data)
      // dispatch(setTransaction(data.data.data))
    }else{

    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'end' }}>
        <button onClick={previous} className="btn bt-light" style={{ background: 'white' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
          </svg>
        </button>
        <div className="App">
          <DateRangePicker
            startDate={fromDate}
            endDate={toDate}
            ranges={range}
            alwaysShowCalendars={true}
            onEvent={handleEvent}
            onApply={handleEvent}
          >
            <div>
              <button className="btn btn-light btn" style={{ background: 'white', maxHeight: '38px', overflow: 'hidden' }}>
                {moment(fromDate).format("LL")} to {moment(toDate).format("LL")}
              </button>
            </div>
          </DateRangePicker>
        </div>
        <button onClick={next} className="btn bt-light" style={{ background: 'white' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    </>
  )
}