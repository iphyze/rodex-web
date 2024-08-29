import React from 'react';
import './Ahome.css';
import { motion } from 'framer-motion';
import DataTable from 'react-data-table-component';


const Home = () => {

  const data = [{ id: 1, title: 'Example Item 1', year: '2019' }, { id: 2, title: 'Example Item 2', year: '2020' }];

// Replace this with your actual data

const columns = [
  { name: 'Title', selector: 'title', sortable: true },
  { name: 'Year', selector: 'year', sortable: true },
  // Add as many columns as you have fields in your data
];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      } 
    },
  };

  return (
      <React.Fragment>
        <div className='admin-container'>

          <div className='hello-user'>Hello {localStorage.getItem('username') || 'Guest'}, your system is running smoothly!</div>

          <div className='admin-dashboard-flexbox'>

            <motion.div className='admin-dash-box admin-dash-col-1'
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
              <div className='admin-dash-icon fas fa-user a-dash-col-1'></div>
              <div className='admin-dash-number'>350</div>
              <div className='admin-dash-category'>Total Music Artist</div>
            </motion.div>

            <motion.div className='admin-dash-box admin-dash-col-2'
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
              <div className='admin-dash-icon fas fa-headphones a-dash-col-2'></div>
              <div className='admin-dash-number'>300</div>
              <div className='admin-dash-category'>Total Music Albums</div>
            </motion.div>

            <motion.div className='admin-dash-box admin-dash-col-3'
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
              <div className='admin-dash-icon fas fa-microphone a-dash-col-3'></div>
              <div className='admin-dash-number'>200</div>
              <div className='admin-dash-category'>Total Songs</div>
            </motion.div>

            <motion.div className='admin-dash-box admin-dash-col-4'
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
              <div className='admin-dash-icon fas fa-music a-dash-col-4'></div>
              <div className='admin-dash-number'>250</div>
              <div className='admin-dash-category'>Total Playlist</div>
            </motion.div>

            <motion.div className='admin-dash-box admin-dash-col-5'
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            >
              <div className='admin-dash-icon fas fa-record-vinyl a-dash-col-5'></div>
              <div className='admin-dash-number'>110</div>
              <div className='admin-dash-category'>Total Users</div>
            </motion.div>

          </div>


        <div className='dataTable'>
          {/* <DataTable
            title="My Data Table"
            columns={columns}
            data={data}
          /> */}
        </div>


        </div>
      </React.Fragment>
  )
}

export default Home;