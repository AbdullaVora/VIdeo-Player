import { useEffect, useState } from 'react';
import Header from '../components/Header';
// import { Link } from 'react-router-dom';

const DashBoard = () => {
    const [bar1, setBar1] = useState(0);
    const [bar2, setBar2] = useState(0);
    const [bar3, setBar3] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedValue = localStorage.getItem('s');
        const totalValue = localStorage.getItem('d');
        const totalVideo = localStorage.getItem('total');
        const totalVideos = localStorage.getItem('totalVideo');
        let value = (storedValue / totalValue) * 100 || 0 ;
        let totalVideoValue = (totalVideo / totalVideos) * 100 || 0;
        let performance = (totalVideoValue / value) * 100 || 0;
        setBar1(value);
        setBar2(totalVideoValue);
        console.log(performance + ' performance');
        
        setBar3(performance)
        setTotal(totalVideo);
    }, []); 

    return (
        <div style={{ height: '100vh' }}>
            <Header />
            <div className="flex">
                {/* <div className='aside-dash'>
                    <Link style={{ textDecoration: 'none', color: 'white', fontSize: '20px' }}>DashBoard</Link>
                </div> */}
                <div className="main" style={{ padding: '20px' , marginTop:'90px'}}>
                    <div className="box">
                        <div className="video-watched" style={{ marginBottom: '18px' }}>
                            <h3>Performance</h3>
                            <div className="bar" style={{ backgroundColor: 'aliceblue', width: '100%' }}>
                                <div className="fill" style={{ backgroundColor: 'bisque', width: `${bar3}%`, textAlign:'center', color:'crimson', fontWeight:'bold' }}>{Math.floor(bar3)}%</div>
                            </div>
                        </div>
                        <div className="video-watched" style={{ marginBottom: '18px' }}>
                            <h3>Total Video Watched</h3>
                            <div className="bar" style={{ backgroundColor: 'aliceblue', width: '100%'}}>
                                <div className="fill" style={{ backgroundColor: 'bisque', width: `${bar2}%`, textAlign:'center', color:'crimson', fontWeight:'bold' }}>{total}</div>
                            </div>
                        </div>
                        <div className="video-watched" style={{ marginBottom: '18px' }}>
                            <h3>Current Video Watched</h3>
                            <div className="bar" style={{ backgroundColor: 'aliceblue', width: '100%' }}>
                                <div className="fill" style={{ backgroundColor: 'bisque', width: `${bar1}%`, textAlign:'center', color:'crimson', fontWeight:'bold'}}>{Math.floor(bar1)}%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
