import { Vortex } from 'react-loader-spinner';

import css from './Spinner.module.css';

export const Spinner = ({ size }) => (
  <div className={size ?? css.spinnerWrapper}>
    <Vortex
      visible={true}
      height={size || '150'}
      width={size || '150'}
      ariaLabel="vortex-loading"
      wrapperStyle={{
        display: 'block',
        margin: 'auto',
      }}
      wrapperClass=""
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  </div>
);
