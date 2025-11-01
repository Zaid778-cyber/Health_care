import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import styles from '../styles/register.module.css';

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ mode: 'onTouched' });

  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password', '');

  const onSubmit = async (data) => {
    console.log('form data', data);
    reset();
    navigate("/Dashboard"); 
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={styles.title}>Create an account</h2>

        <label className={styles.label} htmlFor="name">Full name</label>
        <input
          id="name"
          className={styles.input}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Too short' },
          })}
          placeholder="Your full name"
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}

        <label className={styles.label} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email',
            },
          })}
          placeholder="you@example.com"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <label className={styles.label} htmlFor="password">Password</label>
        <div className={styles.passwordWrap}>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className={styles.input}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
            })}
            placeholder="Enter a strong password"
          />
          <button
            type="button"
            className={styles.showBtn}
            onClick={() => setShowPassword((s) => !s)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <p className={styles.error}>{errors.password.message}</p>}

        <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          className={styles.input}
          {...register('confirmPassword', {
            required: 'Please confirm password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          placeholder="Re-type your password"
        />
        {errors.confirmPassword && (
          <p className={styles.error}>{errors.confirmPassword.message}</p>
        )}

        <label className={styles.label} htmlFor="role">I am a</label>
        <select
          id="role"
          className={styles.select}
          {...register('role', { required: 'Please select a role' })}
        >
          <option value="">Select role...</option>
          <option value="student">Student</option>
          <option value="developer">Developer</option>
          <option value="other">Other</option>
        </select>
        {errors.role && <p className={styles.error}>{errors.role.message}</p>}

        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            {...register('terms', { required: 'You must accept terms' })}
          />
          <span className={styles.checkboxText}>
            I agree to the terms and conditions
          </span>
        </label>
        {errors.terms && <p className={styles.error}>{errors.terms.message}</p>}

        <button className={styles.submit} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>

        <p className={styles.small}>
          Already have an account? <NavLink to="/login">/Login</NavLink>
        </p>
      </form>
    </div>
  );
}
