// src/components/LoadingSpinner.js
import React, { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';

export const LoadingSpinner2 = () => {
    const styles: { spinnerContainer: CSSProperties } = {
        spinnerContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 1000,
        }
    };
    
    return (
        <div style={styles.spinnerContainer}>
            <ClipLoader color={"#123abc"} loading={true} size={150} />
        </div>
    );
};
