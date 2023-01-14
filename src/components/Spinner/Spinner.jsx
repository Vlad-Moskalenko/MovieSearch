import { ColorRing } from 'react-loader-spinner';

import css from './Spinner.module.css';

export const Spinner = ({ size }) => (
  <div className={size ?? css.spinnerWrapper}>
    <ColorRing
      visible={true}
      height={size || '150'}
      width={size || '150'}
      ariaLabel="blocks-loading"
      wrapperStyle={{
        display: 'block',
        margin: 'auto',
      }}
      wrapperClass=""
      colors={['#FF001B', '#ff6b01', '#FF001B', '#ff6b01', '#FF001B']}
    />
  </div>
);
