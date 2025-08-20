
async function fetchProfileData() {
    // Usando o arquivo local para garantir que as informações sejam carregadas corretamente
    const url = './data/profile.json';
    const response = await fetch(url)
    const profileData = await response.json()
    return profileData
}
