import React, { useState, useEffect } from "react"
import styles from "./Home.module.css"

import datajson from "./data.json"

import axios from "axios"

const Home = () => {
  const [data, setData] = useState([])
  const [stars, setStars] = useState(0)

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/AswinAsok/lev")
      .then((response) => {
        // handle success
        setStars(response.data.stargazers_count)
      })
      .catch((error) => {
        // handle error
        console.log(error)
      })
  }, [])

  useEffect(() => {
    // Fetch the holiday data and set it in the state
    setData(datajson)

    // Update the cards every second
    const intervalId = setInterval(() => {
      setData([...datajson])
    }, 1000)

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  function calculateCountdown(targetDate) {
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds left`
    } else {
      return "This holiday has already passed"
    }
  }
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.navbar}>
            <div className={styles.navbar_texts}>
              <p className={styles.branding}>Lev.</p>
              <p className={styles.b_tagline}>Holidays, at your fingertips</p>
            </div>
            <button className={styles.mark_star1}>{stars} Stars</button>
          </div>
          <div className={styles.first_view}>
            <img
              src="/assets/fvimage.webp"
              alt=""
              className={styles.fv_image}
            />
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Presenting Lev, Holidays at your Fingertips.
              </p>
              <p className={styles.fv_tagline}>
                Lev is a platform that allows you to find when is the next
                holiday, so that you can work more.
              </p>
              <div className={styles.buttons}>
                <button className={styles.mark_star}>{stars} Stars</button>
                <a
                  href="http://github.com/AswinAsok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.follow_me}>Follow Me</button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>Upcoming Holidays</p>
              <p className={styles.sv_tagline}>
                Get ready to celebrate! Listed below are your Upcoming holidays
                - don't forget to mark your calendars.
              </p>
            </div>
            <div className={styles.card_container}>
              {/* Display only upcoming holidays */}

              {data.map((item) => {
                const holidayDate = new Date(item.Date)
                const today = new Date()

                if (holidayDate >= today) {
                  return (
                    <div className={styles.card}>
                      <p className={styles.holiday_name}>{item.Name}</p>
                      <p className={styles.holiday_date}>{item.Date}</p>
                      <p className={styles.holiday_description}>
                        {item.Description}
                      </p>
                      <p className={styles.holiday_type}>Type: {item.Types}</p>
                      <p className={styles.countdown}>
                        {calculateCountdown(holidayDate)}
                      </p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>Previous Holidays</p>
              <p className={styles.sv_tagline}>
                Get ready to celebrate! Listed below are your Upcoming holidays
                - don't forget to mark your calendars.
              </p>
            </div>
            <div className={styles.card_container}>
              {data.map((item) => {
                const holidayDate = new Date(item.Date)
                const today = new Date()

                const date = new Date(item.Date)
                const formattedDate = date.toLocaleDateString("en-US", options)

                if (holidayDate <= today && formattedDate !== "Invalid Date") {
                  return (
                    <div className={styles.card}>
                      <p className={styles.holiday_name}>{item.Name}</p>
                      <p className={styles.holiday_date}>{formattedDate}</p>
                      <p className={styles.holiday_description}>
                        {item.Description}
                      </p>
                      <p className={styles.holiday_type}>Type: {item.Types}</p>
                      <p className={styles.countdown}>
                        {calculateCountdown(holidayDate)}
                      </p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
        <p className={styles.footer}>
          Made with ❤️ by <a href="https://github.com/AswinAsok">Aswin Asok</a>
          <br />
          Midnight Project#1
        </p>
      </div>
    </>
  )
}

export default Home
