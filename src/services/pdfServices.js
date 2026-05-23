
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib")
const fs = require("fs")
const path = require('path')

async function createPDF(name, internshipTitle, duration, date) {
    const pdfDoc = await PDFDocument.create()
    
    const page = pdfDoc.addPage([842, 595])
    const { width, height } = page.getSize()

    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const fontTimesItalic = await pdfDoc.embedFont(StandardFonts.TimesHelveticaBoldItalic || StandardFonts.TimesRomanItalic)

    const colorGreen = rgb(0.365, 0.737, 0.043)
    const colorPurple = rgb(0.537, 0.353, 0.941)  
    const colorDarkGrey = rgb(0.157, 0.169, 0.173) 
    const colorLightGrey = rgb(0.6, 0.6, 0.6)

    function drawCenteredText(text, y, size, font, color = colorDarkGrey) {
        const textWidth = font.widthOfTextAtSize(text, size);
        page.drawText(text, {
            x: (width - textWidth) / 2,
            y,
            size,
            font,
            color,
        });
    }

    page.drawRectangle({
        x: 30,
        y: 30,
        width: width - 60,
        height: height - 60,
        borderWidth: 1,
        borderColor: colorLightGrey,
    });
    
    page.drawRectangle({
        x: 36,
        y: 36,
        width: width - 72,
        height: height - 72,
        borderWidth: 1.5,
        borderColor: colorGreen,
    });

    
    try {
        const logoPath = path.join(__dirname, "internee.png")
        if (fs.existsSync(logoPath)) {
            const logoImageBytes = fs.readFileSync(logoPath)
            const logoImage = await pdfDoc.embedPng(logoImageBytes)
            
            
            const logoWidth = 180
            const logoHeight = 40 
            
            page.drawImage(logoImage, {
                x: (width - logoWidth) / 2,
                y: height - 110,
                width: logoWidth,
                height: logoHeight,
            });
        }
    } catch (err) {
        console.log("Logo file not found or failed to load, continuing with text layout.");
    }


    const lineY = height - 140
    page.drawLine({
        start: { x: width / 2 - 80, y: lineY },
        end: { x: width / 2 + 80, y: lineY },
        thickness: 1,
        color: colorPurple,
    })

    drawCenteredText('CERTIFICATE OF COMPLETION', height - 200, 26, fontBold, colorDarkGrey);
    drawCenteredText('Internship Program', height - 230, 16, fontRegular, colorLightGrey);

    drawCenteredText('This is to certify that', height - 280, 14, fontRegular, colorDarkGrey);

    
    drawCenteredText(name, height - 330, 32, fontTimesItalic, colorPurple);

    drawCenteredText('has successfully completed the internship program in', height - 370, 13, fontRegular, colorDarkGrey);
    
    
    drawCenteredText(internshipTitle, height - 400, 18, fontBold, colorGreen);
    
    drawCenteredText('at Internee.pk', height - 425, 12, fontRegular, colorLightGrey);
    drawCenteredText(duration, height - 455, 11, fontRegular, colorDarkGrey);

    
    page.drawText(`Date: ${date}`, {
        x: 70,
        y: 85,
        size: 11,
        font: fontRegular,
        color: colorDarkGrey,
    });


    try {
        const signaturePath = path.join(__dirname, "e-signature.png")
        if (fs.existsSync(signaturePath)) {
            const signatureImageBytes = fs.readFileSync(signaturePath)
            const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

            page.drawImage(signatureImage, {
                x: width - 210,
                y: 95,
                width: 110,
                height: 40,
            });
        }
    } catch (err) {
        console.log("Signature image missing, skipping graphic insertion.");
    }

    
    page.drawLine({
        start: { x: width - 230, y: 90 },
        end: { x: width - 70, y: 90 },
        thickness: 1,
        color: colorLightGrey,
    })

    page.drawText('Authorized Signature', {
        x: width - 195,
        y: 75,
        size: 11,
        font: fontRegular,
        color: colorDarkGrey,
    });

    
    const fileName = `certificate-${name.replace(/\s+/g, '_')}.pdf`
    const filePath = path.join(__dirname, fileName)

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync(filePath, pdfBytes)

    return filePath
}

module.exports = createPDF