import React from 'react';
import gtmParts from 'react-google-tag-manager';

class GoogleTagManager extends React.PureComponent {
  render() {
    const gtm = gtmParts({
      id: this.props.gtmId,
      dataLayerName: this.props.dataLayerName || 'dataLayer',
      additionalEvents: this.props.additionalEvents || {},
    });

    return (
      <div>
        <div>{gtm.noScriptAsReact()}</div>
        <div id={this.props.scriptId || 'react-google-tag-manager-gtm'}>
          <script>
            {
              (function gtmInclude(w, d, s, l, i) {
                Object.assign({}, w, { [l]: null });
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js',
                });
                const f = d.getElementsByTagName(s)[0];
                const j = d.createElement(s);
                const dl = l !== 'dataLayer' ? `&l=${l}` : '';
                j.async = true;
                j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
                f.parentNode.insertBefore(j, f);
              }(window, document, 'script', 'dataLayer', this.props.gtmId))
            }
          </script>
        </div>
      </div>
    );
  }
}

GoogleTagManager.propTypes = {
  gtmId: React.PropTypes.string.isRequired,
  dataLayerName: React.PropTypes.string,
  additionalEvents: React.PropTypes.object,
  scriptId: React.PropTypes.string,
};

export default GoogleTagManager;
