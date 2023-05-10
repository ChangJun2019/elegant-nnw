import path from 'node:path'
import { rimrafSync } from 'rimraf'
import { mkdirp } from 'mkdirp'
import compressing from 'compressing'
import { consola } from 'consola'

async function build() {
  try {
    const FILE_NAME = 'Elegant.nnwtheme'
    const targetDir = path.join(__dirname, '../', 'dist')
    const target = path.join(targetDir, FILE_NAME)
    const source = path.join(__dirname, '../', FILE_NAME)
    rimrafSync(targetDir)
    mkdirp.sync(targetDir)
    await compressing.zip.compressDir(source, `${target}.zip`)
    await compressing.tar.compressDir(source, `${target}.tar`)
  }
  catch (error) {
    consola.error(error)
  }
}

build()
