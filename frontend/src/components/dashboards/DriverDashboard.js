import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './DriverDashboard.module.css';

const jokes = [
  {
    setup: 'Why don’t skeletons fight each other?',
    punchline: 'They don’t have the guts.',
  },
  {
    setup: 'I told my wife she was drawing her eyebrows too high.',
    punchline: 'She looked surprised.',
  },
  { setup: 'What do you call fake spaghetti?', punchline: 'An impasta!' },
  {
    setup: 'Want to hear a construction joke?',
    punchline: 'I’m still working on it.',
  },
  {
    setup: 'Why don’t some couples go to the gym?',
    punchline: 'Because some relationships don’t work out.',
  },
  {
    setup: 'I would avoid the sushi if I was you.',
    punchline: 'It’s a little fishy.',
  },
  {
    setup: 'I’m reading a book on anti-gravity.',
    punchline: 'It’s impossible to put down!',
  },
  {
    setup: 'Why did the scarecrow win an award?',
    punchline: 'He was outstanding in his field.',
  },
  {
    setup: 'Why don’t scientists trust atoms?',
    punchline: 'Because they make up everything!',
  },
  {
    setup: 'What do you get when you cross a snowman and a vampire?',
    punchline: 'Frostbite.',
  },
  {
    setup: 'Parallel lines have so much in common.',
    punchline: 'It’s a shame they’ll never meet.',
  },
  { setup: 'Why did the bicycle fall over?', punchline: 'It was two-tired.' },
  {
    setup: 'Why can’t your nose be 12 inches long?',
    punchline: 'Because then it would be a foot!',
  },
  {
    setup: 'What did one hat say to the other?',
    punchline: 'Stay here, I’m going on ahead.',
  },
  {
    setup: 'Why was the math book sad?',
    punchline: 'It had too many problems.',
  },
  { setup: 'What’s orange and sounds like a parrot?', punchline: 'A carrot.' },
  {
    setup: 'How does a penguin build its house?',
    punchline: 'Igloos it together.',
  },
  {
    setup: 'I used to play piano by ear,',
    punchline: 'but now I use my hands.',
  },
  {
    setup: 'Did you hear about the restaurant on the moon?',
    punchline: 'Great food, no atmosphere.',
  },
  {
    setup: 'Why did the golfer bring extra pants?',
    punchline: 'In case he got a hole in one!',
  },
  {
    setup: 'How do you make a tissue dance?',
    punchline: 'Put a little boogie in it!',
  },
  {
    setup: 'Why did the invisible man turn down the job offer?',
    punchline: 'He couldn’t see himself doing it!',
  },
  {
    setup: 'Why did the chicken join a band?',
    punchline: 'Because it had the drumsticks!',
  },
  {
    setup: 'What’s brown and sticky?',
    punchline: 'A stick.',
  },

  {
    setup: 'Why did the ocean say to the beach?',
    punchline: 'Nothing, it just waved!',
  },
  {
    setup: 'Why did the tomato turn red?',
    punchline: 'Because it saw the salad dressing!',
  },
  {
    setup: 'How do you organize a space party?',
    punchline: 'You planet!',
  },
  {
    setup: 'Why did the golfer bring two pairs of pants?',
    punchline: 'In case he got a hole in one!',
  },
  {
    setup: 'What do you call a factory that makes good products?',
    punchline: 'A satisfactory!',
  },
  {
    setup: 'What do you call an alligator in a vest?',
    punchline: 'An investigator!',
  },
  {
    setup: "Why don't skeletons fight each other?",
    punchline: 'They don’t have the guts!',
  },
  {
    setup: 'What do you call a bear with no teeth?',
    punchline: 'A gummy bear!',
  },
  {
    setup: 'What did one hat say to the other?',
    punchline: 'You stay here, I’ll go on ahead!',
  },
  {
    setup: 'Why did the cookie go to the hospital?',
    punchline: 'Because it felt crummy!',
  },
  {
    setup: "What do you call cheese that isn't yours?",
    punchline: 'Nacho cheese!',
  },
  {
    setup: 'Why was the math book sad?',
    punchline: 'It had too many problems!',
  },
  {
    setup: 'How does a penguin build its house?',
    punchline: 'Igloos it together!',
  },
  {
    setup: 'What do you call fake spaghetti?',
    punchline: 'An impasta!',
  },
  {
    setup: 'Why did the bicycle fall over?',
    punchline: 'Because it was two-tired!',
  },
  {
    setup: "Why don't scientists trust atoms?",
    punchline: 'Because they make up everything!',
  },
  {
    setup: 'What did one wall say to the other wall?',
    punchline: "I'll meet you at the corner!",
  },
  {
    setup: 'Why did the computer go to the doctor?',
    punchline: 'It had a virus!',
  },
  {
    setup: 'Why are ghosts bad liars?',
    punchline: 'Because you can see right through them!',
  },
  {
    setup: 'What’s orange and sounds like a parrot?',
    punchline: 'A carrot!',
  },
];

const DriverDashboard = () => {
  const [formData, setFormData] = useState({
    hauledFrom: '',
    hauledTo: '',
    material: '',
    quantity: '',
    phaseCode: '',
  });

  const [materials, setMaterials] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loadcounts, setLoadcount] = useState([]);
  const [phaseCodes, setPhaseCodes] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [showNotification, setShowNotification] = useState(false);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [allDeliveriesEntered, setAllDeliveriesEntered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set a random joke index on initial load
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    setCurrentJokeIndex(randomIndex);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materialsRes, jobsRes, loadcountsRes, phaseCodesRes] =
          await Promise.all([
            axios.get('/api/material'),
            axios.get('/api/job'),
            axios.get('/api/loadcount'),
            axios.get('/api/phasecode'),
          ]);

        setMaterials(materialsRes.data);
        setJobs(jobsRes.data);
        setLoadcount(loadcountsRes.data);
        setPhaseCodes(phaseCodesRes.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate the form
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `Please enter '${key}'`;
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true); // Trigger button press animation
      await axios.post('/api/delivery', formData);
      setShowNotification(true);

      // Toggle to show the punchline after the setup
      setTimeout(() => {
        setShowNotification(false);

        // If punchline was shown, move to the next joke
        if (showPunchline) {
          setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
        }

        // Flip between showing the punchline and the setup
        setShowPunchline(!showPunchline);
      }, 5000); // Hide after 5 seconds

      // Reset form after successful submission
      setFormData({
        hauledFrom: '',
        hauledTo: '',
        material: '',
        quantity: '',
        phaseCode: '',
      });

      setTimeout(() => setIsSubmitting(false), 200); // End button press animation
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit delivery');
    }
  };

  const handleAllDeliveriesEntered = () => {
    setAllDeliveriesEntered(true);
    setTimeout(() => {
      setAllDeliveriesEntered(false);
    }, 5000); // Show for 5 seconds
  };

  if (isLoading) {
    return <div className={styles.loadingMessage}>Loading data...</div>;
  }

  const formFields = [
    {
      label: 'Location',
      name: 'hauledTo',
      options: jobs,
      optionValue: 'job_number',
      optionLabel: 'job_name',
    },
    {
      label: 'Source',
      name: 'hauledFrom',
      options: jobs,
      optionValue: 'job_number',
      optionLabel: 'job_name',
    },
    {
      label: 'Material',
      name: 'material',
      options: materials,
      optionValue: 'item_code',
      optionLabel: 'description',
    },
    {
      label: 'Yds',
      name: 'quantity',
      options: loadcounts,
      optionValue: 'quantity',
      optionLabel: 'quantity',
    },
    {
      label: 'Phase',
      name: 'phaseCode',
      options: phaseCodes,
      optionValue: 'phaseCode',
      optionLabel: 'description',
    },
  ];

  return (
    <div className={styles.formContainer}>
      {showNotification && (
        <div className={styles.notification}>
          <div className={styles.notificationContent}>
            <p>🎉 🚚🚚🚚 🎉</p>
            <h3>Delivery Recorded!</h3>
            <p>
              {showPunchline
                ? jokes[currentJokeIndex].punchline
                : jokes[currentJokeIndex].setup}
            </p>
          </div>
        </div>
      )}

      {allDeliveriesEntered && (
        <div className={styles.allDeliveriesNotification}>
          <h3>All Deliveries Entered!</h3>
        </div>
      )}

      <h3 className={styles.formTitle}>DT9000</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          {formFields.map((field) => (
            <div key={field.name} className={styles.inputGroup}>
              <label htmlFor={field.name} className={styles.formLabel}>
                {field.label}:
              </label>
              <select
                id={field.name}
                name={field.name}
                className={styles.formSelect}
                value={formData[field.name]}
                onChange={handleChange}
              >
                <option value="">{field.label}</option>
                {field.options.length > 0 ? (
                  field.options.map((option, index) => (
                    <option key={index} value={option[field.optionValue]}>
                      {option[field.optionLabel]}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
              {errors[field.name] && (
                <div className={styles.errorMessage}>{errors[field.name]}</div>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`${styles.formButton} ${
            isSubmitting ? styles.buttonPressed : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Delivery'}
        </button>
      </form>
    </div>
  );
};

export default DriverDashboard;
