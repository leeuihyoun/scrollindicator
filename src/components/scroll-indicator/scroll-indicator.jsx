//ScrollIndicator 라는 컴포넌트를 만들어서
// App.js에 붙이기
import { useEffect, useState } from 'react'
import './scroll-indicator.css'



export default function ScrollIndicator({url}){
	
	let[data,setData] = useState([]);
	let[loading, setLoading] = useState(false);
	let[errMsg,setErrMsg] = useState("");

	let[scrollPercentage, setScrollPercentage] = useState(0);

	async function fetchData(url){
		try{
			// 서버에 요청을 하기 전에 로딩 상태로 만든다
			setLoading(true);

			let res = await fetch(url);
			const res_json = await res.json();

			setData(res_json.products);
			setLoading(false);

			setData(res_json.products);
		}catch(e){
			setErrMsg(e.message)
		}
	}
	// useEffect에서 비동기로  fetch(get요청)
//서버에서 데이터를 받아옴
//1. 서버의 주소
//2. 데이터를 저장할 state
//4. fetch와 같은 오래 걸리는 작업을 처리할 useEffect
// useEffect : 컴포넌트 생성시, 변경시, 해제시 코드 삽입
// fetch(HTTP 요청)은 화면에 영향이 가지 않도록 async 제작



useEffect(()=>{
	//처음에는 무조건 1번 실행 (생성시 mount)
	//fetch로 get요청해서 데이터를 받아서 data에 넣자
	fetchData(url);


},[url]) // url이 바뀔때마다 실행 (안적으면 모든 데이터에 대해 실행)
//스크롤 이벤트
useEffect(()=>{
	window.addEventListener('scroll',changeScrollEvent)
})
function changeScrollEvent(){
	let scrolled = document.documentElement.scrollTop;
	//창이 작을수도 있으니  현재 열려있는 창의 스크롤 범위를 계산
	let height = document.documentElement.scrollHeight -
	document.documentElement.clientHeight;

	setScrollPercentage((scrolled / height) * 100);
}
console.log(data)
if(loading){
	//컴포넌트도 함수기 때문에 return을 만나면 그 즉시 종료(밑ㅇ에 코드 실행x)
	return(
		<div>데이터 로딩중...</div>
	)
}
if(errMsg){
	<div>{errMsg}</div>
}
return(
		<>
		<div className='top-nav-container'>
			<h1>Scroll Indicator</h1>
			{/* 스크롤 진행도 전체 범위 */}
			<div className='scroll-progress-tracking'>
				{/*스크롤의 실제 위치를 퍼센트로 그려줄 박스 */}
				<div className='current-progress-bar' style={{width:`${scrollPercentage}%`}}>

				</div>
			</div>
		</div>
		{/* 스클롤용 데이터 */}
			<div className='data-list'>
					{
						//data가 비어있지않고 길이가 0보다 클때 p태그 생성
					data && data.length > 0?
					data.map((e,idx)=>{
						return(
							<p key={idx}>{e.title}</p>
							)
					})
					: null
					//data를 map을 통해 p 태그로 출력
					}

					
				

			</div>
			
		</>
	)
	
}