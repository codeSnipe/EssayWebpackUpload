const fs = require('fs');
const glob = require('glob');
const request = require('request');


function EssayWebpackUpload(options) {
    this.options = Object.assign(_default, options);
}

webpackUploadPlugin.prototype.apply = function(compiler) {
    var options = this.options
    var source = options.source
    var previewDir = options.previewDir
    var cdnDir = options.cdnDir
    var host = options.host
    var port = options.port
    var exclude = options.exclude || `.DS_Store|.babelrc|.git|node_modules|${options.exclude}`

    if (!/^\//.test(previewDir)) {
        previewDir = `/var/www/html/${previewDir}`
    }

    if (!/^\//.test(cdnDir)) {
        cdnDir = `/var/www/html/${cdnDir}`
    }

    if (!previewDir) {
        console.log(`previewDir must both defined`)
        return
    }
    if (!cdnDir) {
        console.log(`cdnDir must both defined`)
        return
    }

    compiler.plugin('done', function() {
        var formData = {};
        glob(`${source}/**`, {
            nodir: true
        }, function(err, files) {
            files.forEach((file) => {
                let serverDir = '';
                filePath = file.slice(source.length + 1, file.length)
                if (/html$/.test(file)) {
                    serverDir = `${previewDir}/${filePath}`;
                } else {
                    serverDir = `${cdnDir}/${filePath}`;
                }
                formData[serverDir] = fs.createReadStream(file);
            });
            request.post({
                url: `http://${host}:${port}`,
                formData: formData
            }, (error, res, body) => {
                if (error) {
                    console.log(error);
                } else if (res.statusCode !== 200) {
                    new Error(`remote server status error, code ${res.statusCode}`)
                } else {
                    console.log(`Upload [${source}] File success`)
                }
            })
        })

    })
}
var _default = {
    host: "",
    port: "3000",
    source: "dist",
    previewDir: "",
    cdnDir: ""
}
module.exports = EssayWebpackUpload