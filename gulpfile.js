const fs = require('fs')
const gulp = require('gulp')
const jsdoc2md = require('jsdoc-to-markdown')

gulp.task('docs', (done) => {
  jsdoc2md.render({
    files: 'lib/*.js',
    template: './api.hbs',
  }).then(output => fs.writeFileSync('api.md', output));
  return done();
})
