import React, { Component } from 'react';

export class Footer extends Component {
  render(){
    return(
        <div className="main-footer">
        <div className="container">
          <div className="row">
            {/* Column1 */}
            <div className="col">
              <h5>Elektronski Fakultet Niš</h5>
              <h6 className="list-unstyled">
                <li>Niš, Srbija</li>
                <li>Aleksandra Medvedeva 14, 18115 Niš</li>
              </h6>
            </div>
            {/* Column2 */}
            <div className="col">
              <h5>Osnovni Podaci</h5>
              {/* <ui className="list-unstyled"> */}
                <li>Tel: +381 (18) 529-105</li>
                <li>Fax: +381 (18) 588-399</li>
                <li>e-mail: efinfo@elfak.ni.ac.rs</li>
                <li>PIB: 100232259</li>
                <li>Tekući račun: 840-1721666-89</li>
             {/* </ui> */}
            </div>
            {/* Column3 */}
            <div className="col">
              <h5>Fakultet Na Društvenim mrežama</h5>
             {/* <ui className="list-unstyled"> */}
              <a href="https://www.facebook.com/elektronskifakultetnis/" className="-link js-gps-track" data-gps-track="footer.click({ location: 2, link: 31 })">Facebook</a>
              <br/>
              <a href="https://twitter.com/ElfakOfficial" className="-link js-gps-track" data-gps-track="footer.click({ location: 2, link: 31 })">Twitter</a>
              <br/>
              <a href="https://www.youtube.com/channel/UCKntBvgXE9whCp6OR_DFCig" className="-link js-gps-track" data-gps-track="footer.click({ location: 2, link: 31 })">Youtube</a>
            {/*  </ui> */}
            </div>
          </div>

          <hr />
          <div  className="row">
            <p className="col-sm">
              &copy;{new Date().getFullYear()} Elekronski fakultet Niš | Sva prava zadržana|
              Uslovi korišćenja | Privatno
            </p>
          </div>
        </div>
      </div>
    );
    
  }

}