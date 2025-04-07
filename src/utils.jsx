import React from 'react'

export function FlexRow({ children, style, ...props }) {
  return (
    <div
      {...props}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function FlexCol({ children, style, ...props }) {
  return (
    <div
      {...props}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function TwoColumnGrid({
  children,
  style,
  ...props
}) {
  return (
    <div
      {...props}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function ThreeColumnGrid({
  children,
  style,
  ...props
}) {
  return (
    <div
      {...props}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        width: '100%',
        hieght: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
