/*
Script used to copy the `public` folder, generated by Gatsby `build` command
to `docs` folder, used to deploy the site to Github Pages.
*/
const fs = require('fs-extra')
const path = require('path')

const createRedirects = require('./create-redirects')

function copyFolder(folderSource, folderDest) {
  const source = path.resolve(process.cwd(), folderSource)
  const destination = path.resolve(process.cwd(), folderDest)
  return new Promise((resolve, reject) => {
    fs.copy(source, destination, (err, data) => {
      if (err) return reject(err)
      console.log(`${source} folder copied to ${destination}`)
      resolve(data)
    })
  })
}

async function deploy() {
  console.log('STEP 1: update the `docs` folder')
  await copyFolder('public', 'docs')
  console.log('STEP 2: create all redirect pages')
  await createRedirects()
  console.log('Success! Next step: commit to deploy on Github Pages.')
}

deploy()
