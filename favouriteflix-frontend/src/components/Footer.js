import React, { memo } from 'react'

function Footer() {
  return (
    <footer className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center py-2 py-sm-4 mt-5">
      <p className="mb-2 mb-md-0">© 2022 FavouriteFlix</p>
      <p className="mb-0">Made with <i className="fa-solid fa-heart"></i> by Aadesh Puthran</p>
    </footer>
  )
}

export default memo(Footer);