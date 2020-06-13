import React from 'react';
import DbList from './DbList.component';

export default function Database(props) {
    return (
        <div className='dbBody container'>
            <h2>DATABASES</h2>
            <div className='forms'>
                <DbList listItem='characters' />
                <DbList listItem='desires' />
                <DbList listItem='locations' />
                <DbList listItem='occupations' />
                <DbList listItem='themes' />
                <DbList listItem='worlds' />
            </div>
        </div>
    )
}