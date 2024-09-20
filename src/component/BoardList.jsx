import React, { useState, useEffect } from 'react';
// import { boardList } from '../data/data';
import { Link } from 'react-router-dom';
import './BoardList.css';
import axios from 'axios';

const BoardList = () => {
    //db에 저장되어 있는 board 요소를 가져오기 => boardList 저장
    const [ boardList, setBoardList ] = useState([]);

    //비동기로 db에 접속하여 select로 가져오기
    // (axios.)get : 데이터 가져올때 (생략 가능.)
    // axios.post : 데이터 보낼때 (반드시 써야 함.)
    const getBoardData = async () => {
        try {
            const boards = await axios.get('/list');
            console.log(boards);
            setBoardList(boards.data);
        } catch (error) {
            console.log(error);
        }     
    }  // 데이터 가져오기

    // 컴포넌트가 랜더링 될 때, 혹은 업데이트 될 때 실행되는 hooks
    /*
     useEffect(()=>{
       function  },[deps]);
       - function : 실행시킬 함수
       - deps : 배열형태로 배열안에서 검사하고자 하는 특정값
    */
    useEffect(()=>{
        getBoardData();
    },[]);

    //서버에서 데이터를 가져오는 것보다 화면에서 랜더링 되는 속도가 더 빠름
    // 조건을 걸어줘서 error 방지
    if(boardList.length > 0){

    //안에 return 
   
    }

    return (
        <div className='boardList'>
            <h2>Board List Page</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Writer</th>
                            <th>Reg_date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boardList.map(b=>(
                                <tr key={b.id}>
                                    <td>{b.id}</td>
                                    <td>
                                        <Link to={`/detail/${b.id}`} className='link'>{b.title}</Link>
                                    </td>
                                    <td>{b.writer}</td>
                                    <td>{b.reg_date}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Link to={'/writing'}><button>글쓰기</button></Link>
        </div>
    );
};

export default BoardList;