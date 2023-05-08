import Application from '@ioc:Adonis/Core/Application'
import { string } from '@ioc:Adonis/Core/Helpers'
import FileManager from 'App/Models/FileManager'
import Promise from "bluebird"
import sharp from 'sharp'
import fs from 'fs'

export default class Uploader {

    /**
     * Upload single file
     * @param param0 
     * @returns 
     */
    static async singleFile({ file, folder, uploaderId, extension = "webp", isPrivate = false, quality = 100, width = undefined as any, height = undefined as any, deleteOld = false, deleteId = null as any }) {

        // Check if want to delete old image
        if (deleteOld) {
            
            // Delete file by id
            await this.deleteById(deleteId)

        }

        // Get uploads directory
        const uploadsDir = Application.resourcesPath('static/uploads')

        // Generate a unique id for this file
        const fileId     = string.generateRandom(32)

        // Save icon
        await sharp(file.tmpPath)
            .resize({ width: width, height: height, fit: sharp.fit.contain })
            .webp({ quality: quality })
            .toBuffer()
            .then(data => {

                // Create the folder if it does not exist
                if (!fs.existsSync(`${ uploadsDir }/${ folder }`)) {
                    fs.mkdirSync(`${ uploadsDir }/${ folder }`, '0777');
                }

                // Move the file to folder
                fs.writeFileSync(`${ uploadsDir }/${ folder }/${fileId}.${extension}`, data)
                
            });

        // Create new file
        const fileManager                = new FileManager()
              fileManager.uid            = fileId
              fileManager.file_name      = file.clientName
              fileManager.file_extension = file.extname
              fileManager.file_type      = file.type
              fileManager.file_size      = file.size
              fileManager.file_folder    = folder
              fileManager.uploader_id    = uploaderId
              fileManager.is_private     = isPrivate

        await fileManager.save()

        // Return file id
        return fileManager.id

    }


    /**
     * Delete a file by id
     * @param id 
     * @returns 
     */
    static async deleteById(id) {

        // Get file from database
        const file = await FileManager
                                .query()
                                .where('id', id)
                                .first()

        // Check file available
        if (file) {

            // Get file driectory
            const directory = Application.resourcesPath(`static/uploads/${ file.file_folder }`)
            
            // Delete this file if it exists in local storage
            if (fs.existsSync(`${ directory }/${ file.uid }.webp`)) {
                
                // Delete
                fs.unlinkSync(`${ directory }/${ file.uid }.webp`)

            }
            
            // Delete from database
            await file.delete()

            // Success
            return

        }

        // No file detected
        return

    }


    /**
     * Upload product gallery
     * @param photos 
     * @returns 
     */
    static async galleryCreate(photos) {

        try {

            // Get gallery sizes
            var galleryDimensions = [
                // Large
                {
                    width: 1200,
                    height: undefined,
                    path: 'large'
                },
                // Normal
                {
                    width: 800,
                    height: undefined,
                    path: 'normal'
                },
                // Small
                {
                    width: 300,
                    height: undefined,
                    path: 'small'
                }
            ]

            // Get products directory
            const productsDir = Application.resourcesPath('static/uploads/products')

            // Create directory if it does not exists
            if (!fs.existsSync(productsDir)) {
                fs.mkdirSync(productsDir)
            }

            // Generate response data to return
            var responseData = []
            
            // Loop through gallery photos
            for (let index = 0; index < photos.length; index++) {
                
                // Get single photo
                const photoFile = photos[index]

                // Generate photo name
                const photoName = string.generateRandom(32) as never

                // Add photo name to response data array
                responseData.push(photoName)

                Promise.map(galleryDimensions, function (size) {

                    return sharp(photoFile.tmpPath)
                        .resize({ width: size.width, height: size.height })
                        .webp({ quality: 100 })
                        .toBuffer()
                        .then(data => {
                            fs.writeFileSync(`${productsDir}/${photoName}_${size.path}.webp`, data)
                        });

                })

            }
            
            return this.galleryToJson(responseData)

        } catch (error) {
            console.log("Error: " + error)
        }

    }


    /**
     * Convert gallery array to json
     * To insert it into Database
     * @param {*} gallery 
     */
    static galleryToJson(gallery) {
        // Generate large images
        let large  = []

        // Generate normal images
        let normal = []

        // Generate small images
        let small  = []

        for (let index = 0; index < gallery.length; index++) {

            const image = gallery[index];

            // Push image into large gallery
            large.push(`${image}_large.webp` as never)

            // Push image into normal gallery
            normal.push(`${image}_normal.webp` as never)

            // Push image into small gallery
            small.push(`${image}_small.webp` as never)
            
        }

        // Return gallery as json
        return {
            large : { ...large },
            normal: { ...normal },
            small : { ...small }
        }

    }


    /**
     * Delete old gallery
     * @param product 
     */
    static deleteOldGallery(product) {

        // Get large images
        const large_images  = JSON.parse(product.gallery.large_images)

        // Get normal images
        const normal_images = JSON.parse(product.gallery.medium_images)

        // Get small images
        const small_images  = JSON.parse(product.gallery.small_images)
        
        // Delete large images
        for (const [lKey, lValue] of Object.entries(large_images)) {

            // Set file
            const file = Application.resourcesPath(`static/uploads/products/${ lValue }`)
            
            // Delete file if exists
            if (fs.existsSync(file)) {
                fs.unlinkSync(file)
            }

        }

        // Delete normal images
        for (const [lKey, nValue] of Object.entries(normal_images)) {

            // Set file
            const file = Application.resourcesPath(`static/uploads/products/${ nValue }`)

            // Delete file if exists
            if (fs.existsSync(file)) {
                fs.unlinkSync(file)
            }

        }

        // Delete small images
        for (const [lKey, sValue] of Object.entries(small_images)) {

            // Set file
            const file = Application.resourcesPath(`static/uploads/products/${ sValue }`)

            // Delete file if exists
            if (fs.existsSync(file)) {
                fs.unlinkSync(file)
            }

        }

    }

}