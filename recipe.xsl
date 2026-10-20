<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
<html>
<body>
<h2>My Recipe Book</h2>

<table border="1">
<tr>
    <th>Recipe Name</th>
    <th>Cuisine</th>
    <th>Ingredients</th>
</tr>

<xsl:for-each select="recipebook/recipe">
    <xsl:sort select="cuisine"/>

    <tr>
        <td><xsl:value-of select="name"/></td>
        <td><xsl:value-of select="cuisine"/></td>
        <td>
            <ul>
                <xsl:for-each select="ingredients/ingredient">
                    <li><xsl:value-of select="."/></li>
                </xsl:for-each>
            </ul>
        </td>
    </tr>
</xsl:for-each>

</table>
</body>
</html>
</xsl:template>

</xsl:stylesheet>