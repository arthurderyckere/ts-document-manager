var Handlebars = require('handlebars');
module.exports = function (options) {
  var hashHeight = Number.isInteger(Number(options.hash.height)) && options.hash.height;
  var height = hashHeight || 10;
  var color = options.hash.bgcolor || "#FFFFFF";

  var output = `<!-- SPACER -->
    <table
        bgcolor="${color}"
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tbody>
            <tr>
                <td height="${height}" style="mso-line-height-rule:exactly;height:${height}px;line-height:${height}px;font-size:${height}px;">&#xA0;</td>
            </tr>
        </tbody>
    </table>
    <!-- / SPACER -->`;
  return new Handlebars.SafeString(output);
}

/*
<table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #CCC;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&nbsp;</span>
        </td>
      </tr>
    </tbody>
  </table>
  */
